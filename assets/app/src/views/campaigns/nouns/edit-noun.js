// @flow
import * as React from 'react'
import styled from 'react-emotion'
import flowRight from 'lodash-es/flowRight'
import { Formik } from 'formik'
import { withRouter } from 'react-router-dom'
import { type History } from 'history'

import { connect } from 'r/util/redux'
import { required } from 'r/util/formik'

import type { Noun } from 'r/data/nouns'
import { updateNoun } from 'r/data/nouns/action-creators'
import { withNoun } from 'r/data/nouns/connectors'

import type { Campaign } from 'r/data/campaigns'
import { withCampaign } from 'r/data/campaigns/connectors'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'
import LoadingPage from 'r/components/loading-page'

const FormWrapper = styled('div')`
  max-width: 500px;
`

const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`

type Props = {
  campaign: Campaign,
  noun: Noun,
  history: History,
  updateNoun: Noun => Promise<Noun>,
}
function EditNoun({ campaign, noun, history, updateNoun }: Props) {
  if (!campaign || !noun) return <LoadingPage />
  return (
    <React.Fragment>
      <PageHeader
        title={`Edit ${noun.name}`}
        breadcrumbs={[
          { text: 'Campaigns', to: '/campaigns' },
          { text: campaign.name, to: `/campaigns/${campaign.id}` },
        ]}
      />
      <PageContent>
        <FormWrapper>
          <Formik
            initialValues={{
              name: noun.name,
              description: noun.description,
              nounType: noun.noun_type,
            }}
            onSubmit={(values, { setSubmitting }) => {
              const { name, description, nounType } = values
              updateNoun({
                ...noun,
                name,
                description,
                noun_type: nounType,
              }).then(noun => {
                setSubmitting(false)
                history.push(`/campaigns/${campaign.id}`)
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
                      history.push(`/campaigns/${campaign.id}`)
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

const getIds = ({ match: { params } }) => ({
  campaignId: +params.campaignId,
  nounId: +params.nounId,
})
export default flowRight(
  withRouter,
  withCampaign(props => getIds(props).campaignId),
  withNoun(getIds),
  connect({
    actionCreators: {
      updateNoun,
    },
  }),
)(EditNoun)
