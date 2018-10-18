// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
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
		lifecycle({
			componentDidMount() {
				this.props.fetchMemberList(getCampaignId(this.props))
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
