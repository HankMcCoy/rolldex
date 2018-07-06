// @flow
export type Action = {
  type: string,
  payload?: mixed,
  metadata?: mixed,
}

export function success(actionType: string) {
  return actionType + '_SUCCESS'
}

export function failure(actionType: string) {
  return actionType + '_FAILURE'
}

export function createReducer<State>(
  initialState: State,
  handlers: { [string]: (State, any, Action) => void },
) {
  return function reducer(state: State = initialState, action?: Action) {
    if (action === undefined) return state
    const handler = handlers[action.type]
    return handler ? handler(state, action.payload, action) : state
  }
}
