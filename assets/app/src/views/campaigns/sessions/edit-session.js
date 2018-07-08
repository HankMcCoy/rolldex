// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { type History, withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'
import type { Session } from 'r/data/sessions'
import { updateSession } from 'r/data/sessions/action-creators'
import { withSession } from 'r/data/sessions/connectors'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import SessionForm from './session-form'

type Props = {
  campaign: Campaign | void,
  session: Session,
  history: History,
  updateSession: Session => Promise<Session>,
}
function EditSession({ campaign, session, history, updateSession }: Props) {
  if (!campaign || !session) return <LoadingPage />
  return (
    <React.Fragment>
      <PageHeader
        title={`Edit ${session.name}`}
        breadcrumbs={[
          { text: 'Campaigns', to: '/campaigns' },
          { text: campaign.name, to: `/campaigns/${campaign.id}` },
        ]}
      />
      <PageContent>
        <SessionForm
          initialValues={{
            name: session.name,
            summary: session.summary,
            notes: session.notes,
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { name, summary, notes } = values
            updateSession({
              ...session,
              name,
              summary,
              notes,
            }).then(session => {
              setSubmitting(false)
              history.push(`/campaigns/${campaign.id}/sessions/${session.id}`)
            })
          }}
          onCancel={() => {
            history.push(`/campaigns/${campaign.id}/sessions/${session.id}`)
          }}
        />
      </PageContent>
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  campaignId: +params.campaignId,
  sessionId: +params.sessionId,
})
export default flowRight(
  withRouter,
  withCampaign(props => getIds(props).campaignId),
  withSession(getIds),
  connect({
    actionCreators: {
      updateSession,
    },
  }),
)(EditSession)
