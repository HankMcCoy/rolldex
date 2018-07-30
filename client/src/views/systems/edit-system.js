// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'

import { connect } from 'r/util/redux'
import type { System } from 'r/data/systems'
import { updateSystem } from 'r/data/systems/action-creators'
import { withSystem } from 'r/data/systems/connectors'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import LoadingPage from 'r/components/loading-page'

import SystemForm from './system-form'

type Props = {
  history: History,
  system: System,
  updateSystem: System => Promise<System>,
}
function EditSystem({ system, history, updateSystem }: Props) {
  if (!system) return <LoadingPage />
  return (
    <React.Fragment>
      <PageHeader
        title={`Edit ${system.name}`}
        breadcrumbs={[{ text: 'Systems', to: '/systems' }]}
      />
      <PageContent>
        <SystemForm
          initialValues={{
            name: system.name,
            description: system.description,
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { name, description } = values
            updateSystem({
              ...system,
              name,
              description,
            }).then(noun => {
              setSubmitting(false)
              history.push(`/systems/${system.id}`)
            })
          }}
          onCancel={() => {
            history.push(`/systems/${system.id}`)
          }}
        />
      </PageContent>
    </React.Fragment>
  )
}

export default flowRight(
  withSystem(({ match: { params } }) => +params.campaignId),
  withRouter,
  connect({
    actionCreators: {
      updateSystem,
    },
  }),
)(EditSystem)
