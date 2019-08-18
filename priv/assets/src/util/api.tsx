const errorSubscribers: Array<() => void> = []

type Response = {
	status: number
	ok: boolean
	json: () => Promise<{}>
}
type Args = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE'
	path: string
	body?: any
	handleError?: (resp: Response) => boolean
	signal?: AbortSignal
}
export const callApi = ({
	method,
	path,
	body,
	handleError,
	signal,
}: Args): Promise<any> => {
	return window
		.fetch(path, {
			method,
			body: body !== undefined ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			credentials: 'include',
			signal,
		})
		.then((resp: Response) => {
			if (!resp.ok && (!handleError || handleError(resp))) {
				if (resp.status === 401) {
					window.location.href = '/login'
					throw new Error('UNAUTHORIZED')
				}
				errorSubscribers.forEach(subscriber => subscriber())
				throw new Error('Fetch failed')
			}
			if (resp.status === 204) return undefined
			return resp.json()
		})
}

export const subscribeToErrors = (callback: () => void) => {
	errorSubscribers.push(callback)
}

export const ignoreAborts = (e: Error) => {
	if (e instanceof DOMException && e.name === 'AbortError') {
		return
	}
	throw e
}
