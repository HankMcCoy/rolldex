// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'

import type { Noun } from 'r/data/nouns'
import { withNoun } from 'r/data/nouns/connectors'

type Props = {
  noun: Noun | void,
}
function NounDetail({ noun }: Props) {
  if (!noun) return <LoadingPage />
  const { name, description, noun_type } = noun
  return (
    <React.Fragment>
      <PageHeader title={name} />
      <PageContent>
        TYPE: {noun_type}
        <TextSection title="Description">{description}</TextSection>
      </PageContent>
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  nounId: +params.nounId,
  campaignId: +params.campaignId,
})
export default flowRight(withNoun(getIds))(NounDetail)
