// @flow
const errorSubscribers: Array<() => void> = []

type Response = {
	status: number,
	ok: boolean,
	json: () => Promise<{}>,
}
type Args = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	body?: any,
	handleError?: (resp: Response) => boolean,
}
export const callApi = ({
	method,
	path,
	body,
	handleError,
}: Args): Promise<any> => {
	return window
		.fetch(path, {
			method,
			body: body !== undefined ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			credentials: 'include',
		})
		.then((resp: Response) => {
			if (!resp.ok && (!handleError || handleError(resp))) {
				if (resp.status === 401) {
					window.location = '/login'
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
