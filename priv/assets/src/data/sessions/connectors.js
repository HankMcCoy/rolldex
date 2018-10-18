// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { handleIdChange } from 'r/util/react'
import { connect } from 'r/util/redux'
import type { Session } from 'r/data/sessions'
import { selectSession, selectSessionList } from 'r/data/sessions/selectors'
import { fetchSession, fetchSessionList } from 'r/data/sessions/action-creators'

export const withSession: <T>(
	(T) => { campaignId: number, sessionId: number }
) => HOC<T, { session: Session }> = getIds =>
	flowRight(
		connect({
			actionCreators: {
				fetchSession,
			},
		}),
		handleIdChange({
			getId: getIds,
			handleChange: props => {
				const { campaignId, sessionId } = getIds(props)
				props.fetchSession(campaignId, sessionId)
			},
		}),
		mapProps(props => omit(props, ['fetchSession', 'sessionId'])),
		connect({
			selectors: {
				session: selectSession(props => getIds(props).sessionId),
			},
		})
	)

export const withSessionList: <T>(
	(T) => number
) => HOC<T, { sessions: Array<Session> | void }> = getCampaignId =>
	flowRight(
		connect({
			actionCreators: {
				fetchSessionList,
			},
		}),
		handleIdChange({
			getId: getCampaignId,
			handleChange: props => {
				props.fetchSessionList(getCampaignId(props))
			},
		}),
		mapProps(props => omit(props, 'fetchSessionList')),
		connect({
			selectors: {
				sessions: selectSessionList(getCampaignId),
			},
		})
	)
