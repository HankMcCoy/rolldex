// @flow
import * as React from 'react'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { withProps, mapProps, lifecycle, type HOC } from 'recompose'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import type { Campaign } from 'r/data/campaigns'
import { selectCampaign } from 'r/data/campaigns/selectors'
import { fetchCampaign } from 'r/data/campaigns/action-creators'
import { connect } from 'r/util/redux'

type Props = {
  campaign: Campaign | void,
}
function CampaignDetail({ campaign }: Props) {
  return (
    <React.Fragment>
      <PageHeader title={campaign ? campaign.name : 'Loading...'} />
      <PageContent>
        {campaign ? campaign.description : 'Loading...'}
      </PageContent>
    </React.Fragment>
  )
}

type ExternalProps = {
  campaignId: number,
}
const enhance: HOC<*, ExternalProps> = flowRight(
  connect({
    actionCreators: {
      fetchCampaign,
    },
  }),
  withProps(({ match: { params } }) => ({ campaignId: params.campaignId })),
  lifecycle({
    componentDidMount() {
      this.props.fetchCampaign(this.props.campaignId)
    },
  }),
  connect({
    selectors: {
      campaign: selectCampaign(props => props.campaignId),
    },
  }),
  mapProps(({ campaign }) => ({ campaign })),
)

export default enhance(CampaignDetail)
