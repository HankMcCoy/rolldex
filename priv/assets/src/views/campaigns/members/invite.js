// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { type History } from 'history'
import { withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'

import type { Member, DraftMember } from 'r/data/members'
import { createMember } from 'r/data/members/action-creators'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import MemberForm from './member-form'

type Props = {
  campaign: Campaign,
  history: History,
  createMember: DraftMember => Promise<Member>,
}
function AddNoun({ campaign, history, createMember }: Props) {
  if (!campaign) return <LoadingPage />
  return (
    <React.Fragment>
      <PageHeader
        title="New Member"
        breadcrumbs={[
          { text: 'Campaigns', to: '/campaigns' },
          { text: campaign.name, to: `/campaigns/${campaign.id}` },
        ]}
      />
      <PageContent>
        <MemberForm
          initialValues={{
            email: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { email } = values
            createMember({
              email,
              campaign_id: campaign.id,
              member_type: 'READ_ONLY',
            }).then(() => {
              setSubmitting(false)
              history.push(`/campaigns/${campaign.id}`)
            })
          }}
          onCancel={() => {
            history.push(`/campaigns/${campaign.id}`)
          }}
        />
      </PageContent>
    </React.Fragment>
  )
}

export default flowRight(
  withRouter,
  withCampaign(({ match: { params } }) => +params.campaignId),
  connect({
    actionCreators: {
      createMember,
    },
  })
)(AddNoun)
