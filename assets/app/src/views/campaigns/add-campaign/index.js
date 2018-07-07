// @flow
import * as React from 'react'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik, Field } from 'formik'
import { type History, withRouter } from 'react-router-dom'

import { fromTheme } from 'r/theme'
import type { System } from 'r/data/systems'
import { withSystemList } from 'r/data/systems/connectors'
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
}
function AddCampaign({ systems, history }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Campaign" />
      <PageContent>
        <FormWrapper>
          <Formik
            initialValues={{
              name: '',
              description: '',
              systemId: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { name, description } = values
              const systemId = values.systemId
                ? parseInt(values.systemId, 10)
                : undefined
              console.log({ name, description, systemId })
            }}
            render={({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleSubmit}>
                <FormField name="name" label="Name" />
                <Spacer height={20} />
                <FormField name="systemId" label="System" component="select">
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
                  <PrimaryButton>Save</PrimaryButton>
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
)(AddCampaign)
