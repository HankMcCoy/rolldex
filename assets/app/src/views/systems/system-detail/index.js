import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

type Props = {}
export default function SystemDetail() {
  return (
    <React.Fragment>
      <PageHeader title="Systems Detail" />
      <PageContent>Some info about a system</PageContent>
    </React.Fragment>
  )
}
