import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'components/page-header'
import PageContent from 'components/page-content'

type Props = {}
export default function CampaignDetail() {
  return (
    <React.Fragment>
      <PageHeader title="Campaigns Detail" />
      <PageContent>Some info about a campaign</PageContent>
    </React.Fragment>
  )
}
