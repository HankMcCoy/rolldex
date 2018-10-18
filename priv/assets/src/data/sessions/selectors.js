// @flow

import sortBy from 'lodash-es/sortBy'
import { createSelector } from 'reselect'
import type { State } from './index'

export const selectSessionsById = (state: any): State => state.data.sessions
export const selectSessionList = (getCampaignId: (*) => number) =>
	createSelector(
		[selectSessionsById, (_, props) => getCampaignId(props)],
		(sessionsMap: State, campaignId: number) => {
			const allSessions = Object.keys(sessionsMap).map(k => sessionsMap[+k])
			const sessionsForCampaign = allSessions.filter(
				s => s.campaign_id === campaignId
			)
			return sortBy(sessionsForCampaign, ['inserted_at'])
		}
	)

export const selectSession = (getId: (*) => number) =>
	createSelector(
		[selectSessionsById, (_, props) => getId(props)],
		(sessionsById, id) => sessionsById[id]
	)
