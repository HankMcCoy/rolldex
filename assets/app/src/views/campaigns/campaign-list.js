// @flow
import * as React from 'react'

import { intersperse } from 'r/util'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import Spacer from 'r/components/spacer'
import AddBtn from 'r/components/add-btn'
import ListCard from 'r/components/list-card'
import type { Campaign } from 'r/data/campaigns'
import { withCampaignList } from 'r/data/campaigns/connectors'

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <ListCard
      to={`/campaigns/${campaign.id}`}
      title={campaign.name}
      description={campaign.description}
    />
  )
}

type Props = {
  campaigns: Array<Campaign> | void,
}
function CampaignList({ campaigns }: Props) {
  const content = campaigns
    ? intersperse(
        campaigns.map(c => <CampaignCard campaign={c} key={c.id} />),
        i => <Spacer height={10} key={i} />,
      )
    : 'Loading...'
  return (
    <React.Fragment>
      <PageHeader
        title="Campaigns"
        controls={<AddBtn to="/campaigns/add" inverted />}
      />
      <PageContent>{content}</PageContent>
    </React.Fragment>
  )
}

export default withCampaignList(CampaignList)
