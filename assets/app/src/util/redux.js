// @flow

import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import mapValues from 'lodash-es/mapValues'
import partial from 'lodash-es/partial'
import { callApi } from './api'

export type Action<Payload, Metadata = void> = {
  type: string,
  payload?: Payload,
  metadata?: Metadata,
}

export function success(actionType: string) {
  return actionType + '_SUCCESS'
}

export function failure(actionType: string) {
  return actionType + '_FAILURE'
}

export function createReducer<State>(
  initialState: State,
  handlers: { [string]: (State, any, Action<any, any>) => State },
) {
  return function reducer(
    state: State = initialState,
    action?: Action<any, any>,
  ) {
    if (action === undefined) return state
    const handler = handlers[action.type]
    return handler ? handler(state, action.payload, action) : state
  }
}

type ActionXhrParams = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  actionType: string,
  requestBody?: any,
  initialPayload?: *,
  transformSuccessPayload?: any => any,
  transformFailurePayload?: any => any,
}
export const actionXhr = ({
  method,
  path,
  actionType,
  requestBody,
  initialPayload,
  transformSuccessPayload = p => p,
  transformFailurePayload = p => p,
}: ActionXhrParams) => (dispatch: any) => {
  dispatch({
    type: actionType,
    payload: initialPayload,
  })

  return callApi({
    path,
    method,
    body: requestBody,
  }).then(
    json => {
      const payload = transformSuccessPayload(json.data)
      dispatch({
        type: success(actionType),
        payload,
      })
      return payload
    },
    err => {
      dispatch({
        type: failure(actionType),
        payload: transformFailurePayload(err),
      })
      throw err
    },
  )
}

function mapStateToSelectors(propToSelectorMap) {
  return (state, props) =>
    mapValues(propToSelectorMap, selector => selector(state, props))
}

type ConnectArgs = {
  selectors?: Object,
  actionCreators?: Object,
}
export const connect = ({ selectors, actionCreators }: ConnectArgs) =>
  reduxConnect(
    selectors ? mapStateToSelectors(selectors) : null,
    actionCreators ? partial(bindActionCreators, actionCreators) : null,
  )
