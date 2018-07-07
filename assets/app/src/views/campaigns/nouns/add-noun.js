// @flow
import * as React from 'react'
import { withProps } from 'recompose'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik } from 'formik'
import { type History, withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'
import { required } from 'r/util/formik'
import type { Noun, DraftNoun } from 'r/data/nouns'
import { createNoun } from 'r/data/nouns/action-creators'
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
  campaignId: number,
  history: History,
  createNoun: DraftNoun => Promise<Noun>,
}
function AddNoun({ campaignId, history, createNoun }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Noun" />
      <PageContent>
        <FormWrapper>
          <Formik
            initialValues={{
              name: '',
              description: '',
              nounType: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { name, description, nounType } = values
              createNoun({
                name,
                description,
                noun_type: nounType,
                campaign_id: campaignId,
              }).then(noun => {
                setSubmitting(false)
                history.push(`/campaigns/${campaignId}`)
              })
            }}
            render={({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleSubmit}>
                <FormField name="name" label="Name" validate={required} />
                <Spacer height={20} />
                <FormField
                  name="nounType"
                  label="Type"
                  component="select"
                  validate={required}
                >
                  <option />
                  <option value="PERSON">Person</option>
                  <option value="PLACE">Place</option>
                  <option value="THING">Thing</option>
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
                      history.push(`/campaigns/${campaignId}`)
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
  withRouter,
  withProps(({ match: { params } }) => ({ campaignId: +params.campaignId })),
  connect({
    actionCreators: {
      createNoun,
    },
  }),
)(AddNoun)
