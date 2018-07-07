// @flow
import keyBy from 'lodash-es/keyBy'

import { success, createReducer } from 'r/util/redux'

import { FETCH_SYSTEM_LIST, FETCH_SYSTEM } from './action-types'

export type System = {
  id: number,
  name: string,
  description: string,
  inserted_at: string,
  updated_at: string,
}

type State = {
  [number]: System,
}
const initialState: State = {}
export default createReducer(initialState, {
  [success(FETCH_SYSTEM_LIST)]: (state, systems: Array<System>) => ({
    ...state,
    ...keyBy(systems, 'id'),
  }),
  [success(FETCH_SYSTEM)]: (state, system: System) => ({
    ...state,
    [system.id]: system,
  }),
})
