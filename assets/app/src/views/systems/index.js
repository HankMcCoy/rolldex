import * as React from 'react'
import styled from 'react-emotion'

import PageHeader from 'components/page-header'
import PageContent from 'components/page-content'

type Props = {}
export default function Systems() {
  return (
    <React.Fragment>
      <PageHeader title="Systems" />
      <PageContent>A list of systems</PageContent>
    </React.Fragment>
  )
}
