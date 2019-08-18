
import { useCallback, useEffect, useRef, useState } from 'react'

import cache from './cache'
import invalidationManager from './invalidation-manager'

type Response<T> = {
	ok: boolean,
	status: number,
	json: () => { data: T },
	text: () => string,
}
type MutateMethod = 'PUT' | 'POST' | 'DELETE'

const DEFAULT_OPTIONS = {
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
	credentials: 'include',
}

const useInvalidationHandling = (path: string) => {
	const mutableInvalidationCount = useRef(0)
	const [invalidationCount, setInvalidationCount] = useState(0)
	const handleInvalidation = useCallback(() => {
		// $FlowFixMe
		mutableInvalidationCount.current++
		cache.delete(path)
		setInvalidationCount(mutableInvalidationCount.current)
	}, [path])

	useEffect(() => {
		invalidationManager.subscribe(path, handleInvalidation)
		return () => {
			invalidationManager.unsubscribe(path, handleInvalidation)
		}
	}, [path])

	return invalidationCount
}

const inFlight: Map<string, Promise<mixed>> = new Map()

type FetchResult<T> = [T, void] | [void, Error]
type FetchOptions<T> = {
	handleResponse: (Response<T>) => FetchResult<T>,
	noCache?: boolean,
}
export const useFetch = <T>(
	path: string,
	options?: FetchOptions<T> = {}
): FetchResult<T> => {
	const { noCache, handleResponse } = options

	let cancelled = false
	// $FlowFixMe
	const cachedValue: ?T = noCache ? undefined : cache.get(path)
	const [data, setData] = useState<?T>(cachedValue)
	const [error, setError] = useState()
	const invalidateCount = useInvalidationHandling(path)

	useEffect(() => {
		const fetchData = (): Promise<FetchResult<T>> => {
			const responsePromise: Promise<Response<T>> = window.fetch(path, {
				DEFAULT_OPTIONS,
			})
			return responsePromise
				.then(async (resp: Response<T>) => {
					inFlight.delete(path)
					if (handleResponse) {
						const result = handleResponse(resp)
						if (result) {
							return result
						}
					}
					if (resp.status >= 200 && resp.status < 300) {
						const { data } = await resp.json()
						cache.set(path, data)
						return ([data, undefined]: [T, void])
					} else {
						const text = await resp.text()
						return ([undefined, new Error(text)]: [void, Error])
					}
				})
				.catch((e: Error) => {
					return [undefined, e]
				})
		}
		const promise: Promise<FetchResult<T>> =
			// $FlowFixMe
			inFlight.get(path) || inFlight.set(path, fetchData()).get(path)

		promise.then(async (result: FetchResult<T>) => {
			if (cancelled) {
				return
			}
			const [data, error] = result
			if (data) {
				setData(data)
			} else if (error && error.name !== 'AbortError') {
				setError(error)
			}
		})

		return () => {
			cancelled = true
		}
	}, [path, invalidateCount])

	// $FlowFixMe
	return [data, error]
}

const mutate = async ({
	method,
	path,
	body,
}: {
	method: MutateMethod,
	path: string,
	body?: {},
}) => {
	const resp = await window.fetch(path, {
		...DEFAULT_OPTIONS,
		method,
		body: JSON.stringify(body),
	})

	invalidationManager.invalidate(path)

	return resp
}
export const post = async <T>({
	path,
	body,
}: {
	path: string,
	body?: {},
}): Promise<T> => {
	const resp = await mutate({ method: 'POST', path, body })

	const { data } = await resp.json()
	return data
}
export const put = async <T>({
	path,
	body,
}: {
	path: string,
	body?: {},
}): Promise<T> => {
	const resp = await mutate({ method: 'PUT', path, body })

	const { data } = await resp.json()
	return data
}
export const remove = async ({ path }: { path: string }): Promise<void> => {
	await mutate({ method: 'DELETE', path })

	invalidationManager.invalidate(path)
}
