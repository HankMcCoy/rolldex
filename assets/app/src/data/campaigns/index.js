// @flow
import keyBy from 'lodash-es/keyBy'

import { success, createReducer } from 'r/util/redux'

import {
  CREATE_CAMPAIGN,
  FETCH_CAMPAIGN_LIST,
  FETCH_CAMPAIGN,
} from './action-types'

export type Campaign = {|
  id: number,
  name: string,
  system_id: number,
  description: string,
  inserted_at: string,
  updated_at: string,
|}

export type DraftCampaign = $Diff<
  Campaign,
  {| id: number, inserted_at: string, updated_at: string |},
>

type State = {
  [number]: Campaign,
}
const initialState: State = {}
export default createReducer(initialState, {
  [success(FETCH_CAMPAIGN_LIST)]: (state, campaigns: Array<Campaign>) => ({
    ...state,
    ...keyBy(campaigns, 'id'),
  }),
  [success(FETCH_CAMPAIGN)]: (state, campaign: Campaign) => ({
    ...state,
    [campaign.id]: campaign,
  }),
  [success(CREATE_CAMPAIGN)]: (state, campaign: Campaign) => ({
    ...state,
    [campaign.id]: campaign,
  }),
})
