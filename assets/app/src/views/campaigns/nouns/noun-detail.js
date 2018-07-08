// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'
import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageWithSidebar from 'r/components/page-with-sidebar'
import TextSection from 'r/components/text-section'

import type { Noun, NounType } from 'r/data/nouns'
import { withNoun } from 'r/data/nouns/connectors'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PersonSvg from 'r/svg/person'
import PlaceSvg from 'r/svg/place'
import ThingSvg from 'r/svg/thing'

const nounTypeToSvg: { [NounType]: React.Node } = {
  PERSON: <PersonSvg />,
  PLACE: <PlaceSvg />,
  THING: <ThingSvg />,
}

const AvatarWrapper = styled.div`
  width: ${fromTheme('pageSidebarWidth')}px;
  height: ${fromTheme('pageSidebarWidth')}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9c9dc9;
  border-bottom: 1px solid ${fromTheme('gray87')};
  & > svg {
    width: 60%;
    height: 60%;
    stroke: ${fromTheme('white')};
  }
`

type Props = {
  noun: Noun | void,
  campaign: Campaign | void,
}
function NounDetail({ noun, campaign }: Props) {
  if (!noun || !campaign) return <LoadingPage />
  const { name, description, noun_type } = noun
  const typeSvg = nounTypeToSvg[noun_type]
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
      <PageWithSidebar
        content={<TextSection title="Description">{description}</TextSection>}
        sidebar={<AvatarWrapper>{typeSvg}</AvatarWrapper>}
      />
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
