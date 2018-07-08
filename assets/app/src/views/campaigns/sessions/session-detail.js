// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader, { HeaderButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'

import type { Session } from 'r/data/sessions'
import { withSession } from 'r/data/sessions/connectors'
import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageWithSidebar from 'r/components/page-with-sidebar'

import NounsInSession from './nouns-in-session'

type Props = {
  session: Session | void,
  campaign: Campaign | void,
}
function SessionDetail({ session, campaign }: Props) {
  if (!session || !campaign) return <LoadingPage />
  const { name, summary, notes } = session
  return (
    <React.Fragment>
      <PageHeader
        title={name}
        breadcrumbs={[
          { text: 'Campaigns', to: '/campaigns' },
          { text: campaign.name, to: `/campaigns/${campaign.id}` },
        ]}
        controls={
          <HeaderButton
            to={`/campaigns/${campaign.id}/sessions/${session.id}/edit`}
          >
            Edit
          </HeaderButton>
        }
      />
      <PageWithSidebar
        content={
          <React.Fragment>
            <TextSection title="Summary">{summary}</TextSection>
            <Spacer height={20} />
            <TextSection title="Notes" pre>
              {notes}
            </TextSection>
            <Spacer height={20} />
          </React.Fragment>
        }
        sidebar={<NounsInSession session={session} />}
      />
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  sessionId: +params.sessionId,
  campaignId: +params.campaignId,
})
export default flowRight(
  withSession(getIds),
  withCampaign(props => getIds(props).campaignId),
)(SessionDetail)
