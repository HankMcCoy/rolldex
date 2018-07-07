// @flow
import * as React from 'react'
import { withProps } from 'recompose'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik } from 'formik'
import { type History, withRouter } from 'react-router-dom'

import { connect } from 'r/util/redux'
import { required } from 'r/util/formik'
import type { Session, DraftSession } from 'r/data/sessions'
import { createSession } from 'r/data/sessions/action-creators'
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
  createSession: DraftSession => Promise<Session>,
}
function AddSession({ campaignId, history, createSession }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Session" />
      <PageContent>
        <FormWrapper>
          <Formik
            initialValues={{
              name: '',
              summary: '',
              notes: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { name, summary, notes } = values
              createSession({
                name,
                summary,
                notes,
                campaign_id: campaignId,
              }).then(session => {
                setSubmitting(false)
                history.push(`/campaigns/${campaignId}`)
              })
            }}
            render={({ handleSubmit, handleChange, handleBlur, values }) => (
              <form onSubmit={handleSubmit}>
                <FormField name="name" label="Name" validate={required} />
                <Spacer height={20} />
                <FormField
                  name="summary"
                  label="Summary"
                  component="textarea"
                  validate={required}
                />
                <Spacer height={20} />
                <FormField
                  name="notes"
                  label="Notes"
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
      createSession,
    },
  }),
)(AddSession)
