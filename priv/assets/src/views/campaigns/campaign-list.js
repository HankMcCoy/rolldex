// @flow
import * as React from 'react'

import { intersperse } from 'r/util'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import Spacer from 'r/components/spacer'
import AddBtn from 'r/components/add-btn'
import ListCard from 'r/components/list-card'
import PlainLink from 'r/components/plain-link'
import TitleNSummary from 'r/components/title-n-summary'
import type { Campaign } from 'r/data/campaigns'
import { withCampaignList } from 'r/data/campaigns/connectors'

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <PlainLink to={`/campaigns/${campaign.id}`}>
      <ListCard>
        <TitleNSummary title={campaign.name} summary={campaign.description} />
      </ListCard>
    </PlainLink>
  )
}

type Props = {
  campaigns: Array<Campaign> | void,
}
function CampaignList({ campaigns }: Props) {
  const content = campaigns
    ? intersperse(
        campaigns.map(c => <CampaignCard campaign={c} key={c.id} />),
        i => <Spacer height={10} key={`spacer-${i}`} />
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
