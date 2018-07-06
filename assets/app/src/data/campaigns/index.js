// @flow
import { success, createReducer } from 'util/redux'
import keyBy from 'lodash-es/keyBy'

export const GET_CAMPAIGN_LIST = 'CAMPAIGN/GET_CAMPAIGN_LIST'

export type Campaign = {
  id: string,
  name: string,
  description: string,
}

type State = {
  [string]: Campaign,
}
const initialState: State = {}
export default createReducer(initialState, {
  [success(GET_CAMPAIGN_LIST)]: (state, campaigns: Array<Campaign>) => ({
    ...state,
    ...keyBy(campaigns),
  }),
})
