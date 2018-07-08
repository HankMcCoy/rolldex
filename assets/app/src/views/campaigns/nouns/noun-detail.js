// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'

import type { Noun } from 'r/data/nouns'
import { withNoun } from 'r/data/nouns/connectors'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

type Props = {
  noun: Noun | void,
  campaign: Campaign | void,
}
function NounDetail({ noun, campaign }: Props) {
  if (!noun || !campaign) return <LoadingPage />
  const { name, description, noun_type } = noun
  return (
    <React.Fragment>
      <PageHeader
        title={name}
        breadcrumbs={[
          { text: 'Campaigns', to: '/campaigns' },
          { text: campaign.name, to: `/campaigns/${campaign.id}` },
        ]}
        controls={
          <HeaderButton to={`/campaigns/${campaign.id}/nouns/${noun.id}/edit`}>
            Edit
          </HeaderButton>
        }
      />
      <PageContent>
        TYPE: {noun_type}
        <TextSection title="Description">{description}</TextSection>
      </PageContent>
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  nounId: +params.nounId,
  campaignId: +params.campaignId,
})
export default flowRight(
  withNoun(getIds),
  withCampaign(props => getIds(props).campaignId),
)(NounDetail)
