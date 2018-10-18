// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import { handleIdChange } from 'r/util/react'
import type { Member } from 'r/data/members'
import { selectMemberList } from 'r/data/members/selectors'
import { fetchMemberList, removeMember } from 'r/data/members/action-creators'

export const withMemberList: <T>(
	(T) => number
) => HOC<T, { members: Array<Member> | void }> = getCampaignId =>
	flowRight(
		connect({
			actionCreators: {
				fetchMemberList,
			},
		}),
		handleIdChange({
			getId: getCampaignId,
			handleChange: props => {
				props.fetchMemberList(getCampaignId(props))
			},
		}),
		mapProps(props => omit(props, 'fetchMemberList')),
		connect({
			selectors: {
				members: selectMemberList(getCampaignId),
			},
			actionCreators: {
				removeMember,
			},
		})
	)
