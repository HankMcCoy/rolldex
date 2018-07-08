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
    })
    .then(resp => {
      if (!resp.ok) throw new Error('Fetch failed')
      return resp.json()
    })
}
