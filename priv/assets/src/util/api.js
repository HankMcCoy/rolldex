// @flow
type Args = {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	body?: any,
}
export const callApi = ({ method, path, body }: Args) => {
	return window
		.fetch(path, {
			method,
			body: body !== undefined ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			credentials: 'include',
		})
		.then(resp => {
			if (resp.status === 401) {
				window.location = '/login'
				throw new Error('UNAUTHORIZED')
			}
			if (!resp.ok) throw new Error('Fetch failed')
			if (resp.status === 204) return undefined
			return resp.json()
		})
}
