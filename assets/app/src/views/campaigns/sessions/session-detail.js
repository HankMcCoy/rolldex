// @flow
import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import PageContent from 'r/components/page-content'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'

import type { Session } from 'r/data/sessions'
import { withSession } from 'r/data/sessions/connectors'
import { fromTheme } from 'r/theme'

import NounsInSession from './nouns-in-session'

const HorizLayout = styled.div`
  display: flex;
  flex: 1 0 0%;
`

const LeftColumn = styled.div`
  flex: 1 0 0%;
`

const RightColumn = styled.div`
  flex: 0 0 300px;
`

const PageSidebar = styled.div`
  background: ${fromTheme('campaignColorLight')};
  color: ${fromTheme('campaignText')};
  height: 100%;
`

type Props = {
  session: Session | void,
}
function SessionDetail({ session }: Props) {
  if (!session) return <LoadingPage />
  const { name, summary, notes } = session
  return (
    <React.Fragment>
      <PageHeader title={name} />
      <HorizLayout>
        <LeftColumn>
          <PageContent>
            <TextSection title="Summary">{summary}</TextSection>
            <Spacer height={20} />
            <TextSection title="Notes">{notes}</TextSection>
            <Spacer height={20} />
          </PageContent>
        </LeftColumn>
        <RightColumn>
          <PageSidebar>
            <NounsInSession session={session} />
          </PageSidebar>
        </RightColumn>
      </HorizLayout>
    </React.Fragment>
  )
}

const getIds = ({ match: { params } }) => ({
  sessionId: +params.sessionId,
  campaignId: +params.campaignId,
})
export default withSession(getIds)(SessionDetail)
