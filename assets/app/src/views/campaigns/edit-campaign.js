// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { type History, withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'
import type { Campaign } from 'r/data/campaigns'
import { updateCampaign } from 'r/data/campaigns/action-creators'
import { withCampaign } from 'r/data/campaigns/connectors'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import CampaignForm from './campaign-form'

type Props = {
  history: History,
  campaign: Campaign,
  updateCampaign: Campaign => Promise<Campaign>,
}
function EditCampaign({ campaign, history, updateCampaign }: Props) {
  if (!campaign) return <LoadingPage />
  return (
    <React.Fragment>
      <PageHeader
        title={`Edit ${campaign.name}`}
        breadcrumbs={[{ text: 'Campaigns', to: '/campaigns' }]}
      />
      <PageContent>
        <CampaignForm
          initialValues={{
            name: campaign.name,
            system_id: campaign.system_id.toString(),
            description: campaign.description,
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { name, description } = values
            const system_id = parseInt(values.system_id, 10)
            updateCampaign({
              ...campaign,
              name,
              system_id,
              description,
            }).then(noun => {
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
  withCampaign(({ match: { params } }) => +params.campaignId),
  withRouter,
  connect({
    actionCreators: {
      updateCampaign,
    },
  }),
)(EditCampaign)