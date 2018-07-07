// @flow
import * as React from 'react'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik } from 'formik'
import { type History, withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'
import { required } from 'r/util/formik'
import type { System } from 'r/data/systems'
import { withSystemList } from 'r/data/systems/connectors'
import type { Campaign, DraftCampaign } from 'r/data/campaigns'
import { createCampaign } from 'r/data/campaigns/action-creators'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'

const FormWrapper = styled('div')`
  max-width: 500px;
`

const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`

type Props = {
  systems: Array<System> | void,
  history: History,
  createCampaign: DraftCampaign => Promise<Campaign>,
}
function AddCampaign({ systems, history, createCampaign }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Campaign" />
      <PageContent>
        <FormWrapper>
          <Formik
            initialValues={{
              name: '',
              description: '',
              system_id: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { name, description } = values
              const system_id = parseInt(values.system_id, 10)
              createCampaign({ name, description, system_id }).then(
                campaign => {
                  setSubmitting(false)
                  history.push(`/campaigns/${campaign.id}`)
                },
              )
            }}
            render={({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleSubmit}>
                <FormField name="name" label="Name" validate={required} />
                <Spacer height={20} />
                <FormField
                  name="system_id"
                  label="System"
                  component="select"
                  validate={required}
                >
                  <option />
                  {systems &&
                    systems.map(s => (
                      <option value={s.id} key={s.id}>
                        {s.name}
                      </option>
                    ))}
                </FormField>
                <Spacer height={20} />
                <FormField
                  name="description"
                  label="Description"
                  component="textarea"
                  validate={required}
                />
                <Spacer height={20} />
                <ButtonsWrapper>
                  <SecondaryButton
                    onClick={e => {
                      e.preventDefault()
                      history.push('/campaigns')
                    }}
                  >
                    Cancel
                  </SecondaryButton>
                  <Spacer width={10} />
                  <PrimaryButton type="submit">Save</PrimaryButton>
                </ButtonsWrapper>
              </form>
            )}
          />
        </FormWrapper>
      </PageContent>
    </React.Fragment>
  )
}

export default flowRight(
  withSystemList,
  withRouter,
  connect({
    actionCreators: {
      createCampaign,
    },
  }),
)(AddCampaign)
