// @flow
import keyBy from 'lodash-es/keyBy'

import { actionXhr, success, createReducer } from 'r/util/redux'

import { FETCH_CAMPAIGN_LIST } from './action-types'

export type Campaign = {
  id: number,
  name: string,
  description: string,
  inserted_at: string,
  updated_at: string,
}

type State = {
  [number]: Campaign,
}
const initialState: State = {}
export default createReducer(initialState, {
  [success(FETCH_CAMPAIGN_LIST)]: (state, campaigns: Array<Campaign>) => ({
    ...state,
    ...keyBy(campaigns, 'id'),
  }),
})
