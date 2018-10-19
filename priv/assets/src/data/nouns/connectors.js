// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import { handleIdChange } from 'r/util/react'
import type { Noun } from 'r/data/nouns'
import { selectNoun, selectNounList } from 'r/data/nouns/selectors'
import { fetchNoun, fetchNounList } from 'r/data/nouns/action-creators'

export const withNoun: <T>(
	(T) => { campaignId: number, nounId: number }
) => HOC<T, { noun: Noun }> = getIds =>
	flowRight(
		connect({
			actionCreators: {
				fetchNoun,
			},
		}),
		handleIdChange({
			getId: getIds,
			handleChange: props => {
				console.log('Props', props)
				console.log('Ids', getIds(props))
				const { campaignId, nounId } = getIds(props)
				props.fetchNoun(campaignId, nounId)
			},
		}),
		mapProps(props => omit(props, ['fetchNoun', 'nounId'])),
		connect({
			selectors: {
				noun: selectNoun(props => getIds(props).nounId),
			},
		})
	)

export const withNounList: <T>(
	(T) => number
) => HOC<T, { nouns: Array<Noun> | void }> = getCampaignId =>
	flowRight(
		connect({
			actionCreators: {
				fetchNounList,
			},
		}),
		handleIdChange({
			getId: getCampaignId,
			handleChange: props => {
				props.fetchNounList(getCampaignId(props))
			},
		}),
		mapProps(props => omit(props, 'fetchNounList')),
		connect({
			selectors: {
				nouns: selectNounList(getCampaignId),
			},
		})
	)
