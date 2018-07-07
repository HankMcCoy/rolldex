// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Formik, Field } from 'formik'

import { fromTheme } from 'r/theme'
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

type Props = {}
export default function AddCampaign({  }: Props) {
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
              console.log(values)
            }}
            render={({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleSubmit}>
                <FormField name="name" label="Name" />
                <Spacer height={20} />
                <FormField name="systemId" label="System" component="select">
                  <option />
                  <option value="f">f</option>
                </FormField>
                <Spacer height={20} />
                <FormField
                  name="description"
                  label="Description"
                  component="textarea"
                />
              </form>
            )}
          />
          <Spacer height={20} />
          <ButtonsWrapper>
            <SecondaryButton>Cancel</SecondaryButton>
            <Spacer width={10} />
            <PrimaryButton>Save</PrimaryButton>
          </ButtonsWrapper>
        </FormWrapper>
      </PageContent>
    </React.Fragment>
  )
}
