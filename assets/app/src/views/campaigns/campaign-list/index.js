// @flow
import * as React from 'react'
import styled from 'react-emotion'

import { connect } from 'r/util/redux'
import { intersperse } from 'r/util'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import Spacer from 'r/components/spacer'
import type { Campaign } from 'r/data/campaigns'
import { selectCampaignList } from 'r/data/campaigns/selectors'
import { fetchCampaignList } from 'r/data/campaigns/action-creators'

import CampaignCard from './campaign-card'

type Props = {
  campaigns: Array<Campaign> | void,
  fetchCampaignList: () => void,
}
class CampaignList extends React.Component<Props> {
  render() {
    const { campaigns } = this.props

    const content = campaigns
      ? intersperse(
          campaigns.map(c => <CampaignCard campaign={c} key={c.id} />),
          i => <Spacer height={10} key={i} />,
        )
      : 'Loading...'
    return (
      <React.Fragment>
        <PageHeader title="Campaigns" />
        <PageContent>{content}</PageContent>
      </React.Fragment>
    )
  }
  componentDidMount() {
    this.props.fetchCampaignList()
  }
}

export default connect({
  selectors: {
    campaigns: selectCampaignList,
  },
  actionCreators: {
    fetchCampaignList,
  },
})(CampaignList)
