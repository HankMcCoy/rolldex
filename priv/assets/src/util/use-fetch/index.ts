import { useCallback, useEffect, useRef, useState } from 'react'

import cache from './cache'
import invalidationManager from './invalidation-manager'

type Response<T> = {
	ok: boolean
	status: number
	json: () => { data: T }
	text: () => string
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

const inFlight: Map<string, Promise<unknown>> = new Map()

type FetchResult<T> = [T, undefined] | [undefined, Error]
interface FetchOptions<T> {
	handleResponse?: (response: Response<T>) => FetchResult<T>
	noCache?: boolean
}
export function useFetch<T>(
	path: string,
	options: FetchOptions<T> = {}
): FetchResult<T> {
	const { noCache, handleResponse } = options

	let cancelled = false
	const cachedValue = noCache ? undefined : (cache.get(path) as T)
	const [data, setData] = useState(cachedValue)
	const [error, setError] = useState<Error>()
	const invalidateCount = useInvalidationHandling(path)

	useEffect(() => {
		const fetchData = () => {
			const responsePromise = (window.fetch(path, {
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				credentials: 'include',
			}) as unknown) as Promise<Response<T>>
			return responsePromise
				.then(async resp => {
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
						return [data as T, undefined]
					} else {
						const text = await resp.text()
						return [undefined, new Error(text)]
					}
				})
				.catch((e: Error) => {
					return [undefined, e]
				})
		}
		const promise = (inFlight.get(path) ||
			inFlight.set(path, fetchData()).get(path)) as Promise<FetchResult<T>>

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

	return [data, error] as FetchResult<T>
}

const mutate = async ({
	method,
	path,
	body,
}: {
	method: MutateMethod
	path: string
	body?: {}
}) => {
	const resp = await window.fetch(path, {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		credentials: 'include',
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
	path: string
	body?: {}
}): Promise<T> => {
	const resp = await mutate({ method: 'POST', path, body })

	const { data } = await resp.json()
	return data
}

export const put = async <T>({
	path,
	body,
}: {
	path: string
	body?: {}
}): Promise<T> => {
	const resp = await mutate({ method: 'PUT', path, body })

	const { data } = await resp.json()
	return data
}

export const remove = async ({ path }: { path: string }): Promise<void> => {
	await mutate({ method: 'DELETE', path })

	invalidationManager.invalidate(path)
}
