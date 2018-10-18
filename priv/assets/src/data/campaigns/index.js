// @flow
import keyBy from 'lodash-es/keyBy'

import { success, createReducer } from 'r/util/redux'

import {
	CREATE_CAMPAIGN,
	UPDATE_CAMPAIGN,
	FETCH_CAMPAIGN_LIST,
	FETCH_CAMPAIGN,
} from './action-types'

export type Campaign = {|
	id: number,
	name: string,
	description: string,
	inserted_at: string,
	updated_at: string,
	created_by_id: number,
|}

export type DraftCampaign = $Diff<
	Campaign,
	{|
		id: number,
		inserted_at: string,
		updated_at: string,
		created_by_id: number,
	|}
>

type State = {
	[number]: Campaign,
}
const initialState: State = {}
const updateOne = (state, campaign: Campaign) => ({
	...state,
	[campaign.id]: campaign,
})
export default createReducer(initialState, {
	[success(FETCH_CAMPAIGN_LIST)]: (state, campaigns: Array<Campaign>) => ({
		...state,
		...keyBy(campaigns, 'id'),
	}),
	[success(FETCH_CAMPAIGN)]: updateOne,
	[success(CREATE_CAMPAIGN)]: updateOne,
	[success(UPDATE_CAMPAIGN)]: updateOne,
})
