import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

type Props = {}
export default function CampaignDetail() {
  return (
    <React.Fragment>
      <PageHeader title="Campaigns Detail" />
      <PageContent>Some info about a campaign</PageContent>
    </React.Fragment>
  )
}
