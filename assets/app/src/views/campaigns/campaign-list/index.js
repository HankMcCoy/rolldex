import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'components/page-header'
import PageContent from 'components/page-content'

type Props = {}
export default function CampaignList() {
  return (
    <React.Fragment>
      <PageHeader title="Campaigns" />
      <PageContent>List of campaigns</PageContent>
    </React.Fragment>
  )
}
