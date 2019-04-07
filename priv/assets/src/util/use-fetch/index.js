// @flow
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

type FetchOptions<T> = {
	handleResponse: (
		Response<T>,
		{ setData: T => void, setError: string => void }
	) => boolean,
	noCache?: boolean,
}

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

export const useFetch = <T>(
	path: string,
	options?: FetchOptions<T> = {}
): [?T, any] => {
	const { noCache, handleResponse } = options

	let cancelled = false
	// $FlowFixMe
	const cachedValue: ?T = noCache ? undefined : cache.get(path)
	const [data, setData] = useState<?T>(cachedValue)
	const [error, setError] = useState()
	const invalidateCount = useInvalidationHandling(path)

	useEffect(() => {
		const promise: Promise<Response<T>> = window.fetch(path, DEFAULT_OPTIONS)

		promise
			.then(async (resp: Response<T>) => {
				if (cancelled) {
					return
				}
				if (handleResponse && handleResponse(resp, { setData, setError })) {
					return
				}
				if (resp.status >= 200 && resp.status < 300) {
					const { data } = await resp.json()
					cache.set(path, data)
					setData(data)
				} else {
					const text = await resp.text()
					setError(text)
				}
			})
			.catch(e => {
				setError(e)
			})
		return () => {
			cancelled = true
		}
	}, [path, invalidateCount])

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
