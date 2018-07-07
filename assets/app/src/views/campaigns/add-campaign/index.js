// @flow
import * as React from 'react'
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'

type Props = {}
export default function AddCampaign({  }: Props) {
  return (
    <React.Fragment>
      <PageHeader title="New Campaign" />
      <PageContent>Let's put a form here!</PageContent>
    </React.Fragment>
  )
}
