// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'
import ListCard from 'r/components/list-card'
import AddableList from 'r/components/addable-list'
import ColumnView, { Column } from 'r/components/column-view'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import type { Session } from 'r/data/sessions'
import { withSessionList } from 'r/data/sessions/connectors'

type Props = {
  campaign: Campaign | void,
  sessions: Array<Session> | void,
}
function CampaignDetail({ campaign, sessions }: Props) {
  if (!campaign || !sessions) return <LoadingPage />
  const { name, description, id } = campaign
  return (
    <React.Fragment>
      <PageHeader title={name} />
      <PageContent>
        <ColumnView gutterWidth={40}>
          <Column>
            <TextSection title="Description">{description}</TextSection>
            <Spacer height={20} />
            <AddableList
              title="Sessions"
              addPath={`/campaigns/${id}/sessions/add`}
            >
              {sessions.map(s => (
                <ListCard
                  title={s.name}
                  description={s.summary}
                  to={`/campaigns/${campaign.id}/sessions/${s.id}`}
                />
              ))}
            </AddableList>
          </Column>
          <Column>
            <AddableList
              title="World"
              addPath={`/campaigns/${id}/entities/add`}
            >
              World stuff
            </AddableList>
          </Column>
        </ColumnView>
      </PageContent>
    </React.Fragment>
  )
}

const getCampaignId = ({ match: { params } }) => +params.campaignId
export default flowRight(
  withCampaign(getCampaignId),
  withSessionList(getCampaignId),
)(CampaignDetail)
