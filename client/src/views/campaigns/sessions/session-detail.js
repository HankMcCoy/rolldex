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

import { callApi } from 'r/util/api'

import PageWithSidebar from 'r/components/page-with-sidebar'

import RelatedNouns from 'r/components/related-nouns'

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
            <TextSection title="Notes" markdown>
              {notes}
            </TextSection>
            <Spacer height={20} />
          </React.Fragment>
        }
        sidebar={
          <RelatedNouns
            campaignId={campaign.id}
            getNouns={() =>
              callApi({
                path: `/api/campaigns/${campaign.id}/sessions/${
                  session.id
                }/related-nouns`,
                method: 'GET',
              }).then(({ data: nouns }) => nouns)
            }
          />
        }
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
