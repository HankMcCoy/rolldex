// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'

import PageHeader from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'

import type { Session } from 'r/data/sessions'
import { withSession } from 'r/data/sessions/connectors'

type Props = {
  session: Session | void,
}
function SessionDetail({ session }: Props) {
  if (!session) return <LoadingPage />
  const { name, summary, notes } = session
  return (
    <React.Fragment>
      <PageHeader title={name} />
      <PageContent>
        <TextSection title="Summary">{summary}</TextSection>
        <Spacer height={20} />
        <TextSection title="Notes">{notes}</TextSection>
        <Spacer height={20} />
      </PageContent>
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  sessionId: +params.sessionId,
  campaignId: +params.campaignId,
})
export default flowRight(withSession(getIds))(SessionDetail)
