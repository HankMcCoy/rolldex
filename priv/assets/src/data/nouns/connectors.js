// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import isEqual from 'lodash-es/isEqual'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
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
    lifecycle({
      componentDidMount() {
        const { campaignId, nounId } = getIds(this.props)
        this.props.fetchNoun(campaignId, nounId)
      },
      componentDidUpdate(prevProps) {
        const curIds = getIds(this.props)
        const prevIds = getIds(prevProps)
        if (!isEqual(curIds, prevIds)) {
          this.props.fetchNoun(curIds.campaignId, curIds.nounId)
        }
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
    lifecycle({
      componentDidMount() {
        this.props.fetchNounList(getCampaignId(this.props))
      },
    }),
    mapProps(props => omit(props, 'fetchNounList')),
    connect({
      selectors: {
        nouns: selectNounList(getCampaignId),
      },
    })
  )
