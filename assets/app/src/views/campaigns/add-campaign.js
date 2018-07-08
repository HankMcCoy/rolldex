// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'

import { connect } from 'r/util/redux'
import type { Campaign, DraftCampaign } from 'r/data/campaigns'
import { createCampaign } from 'r/data/campaigns/action-creators'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

import CampaignForm from './campaign-form'

type Props = {
  history: History,
  createCampaign: DraftCampaign => Promise<Campaign>,
}
function AddCampaign({ history, createCampaign }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Campaign" />
      <PageContent>
        <CampaignForm
          initialValues={{
            name: '',
            description: '',
            system_id: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { name, description } = values
            const system_id = parseInt(values.system_id, 10)
            createCampaign({ name, description, system_id }).then(campaign => {
              setSubmitting(false)
              history.push(`/campaigns/${campaign.id}`)
            })
          }}
          onCancel={() => {
            history.push('/campaigns')
          }}
        />
      </PageContent>
    </React.Fragment>
  )
}

export default flowRight(
  withRouter,
  connect({
    actionCreators: {
      createCampaign,
    },
  }),
)(AddCampaign)
