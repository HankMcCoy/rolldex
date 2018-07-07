// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import type { Campaign } from 'r/data/campaigns'
import { selectCampaign, selectCampaignList } from 'r/data/campaigns/selectors'
import {
  fetchCampaign,
  fetchCampaignList,
} from 'r/data/campaigns/action-creators'

export const withCampaign: <T>(
  (T) => number,
) => HOC<T, { campaign: Campaign }> = getId =>
  flowRight(
    connect({
      actionCreators: {
        fetchCampaign,
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.fetchCampaign(getId(this.props))
      },
    }),
    mapProps(props => omit(props, ['fetchCampaign', 'campaignId'])),
    connect({
      selectors: {
        campaign: selectCampaign(getId),
      },
    }),
  )

export const withCampaignList: HOC<
  *,
  { campaigns: Array<Campaign> | void },
> = flowRight(
  connect({
    actionCreators: {
      fetchCampaignList,
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchCampaignList()
    },
  }),
  mapProps(props => omit(props, 'fetchCampaignList')),
  connect({
    selectors: {
      campaigns: selectCampaignList,
    },
  }),
)
