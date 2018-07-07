// @flow
import * as React from 'react'

import { intersperse } from 'r/util'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import Spacer from 'r/components/spacer'
import type { System } from 'r/data/systems'
import { withSystemList } from 'r/data/systems/connectors'

import SystemCard from './system-card'

const renderSystem = s => <SystemCard system={s} key={s.id} />
const renderSpacer = i => <Spacer height={10} key={`spacer-${i}`} />

type Props = {
  systems: Array<System> | void,
}
const SystemList = ({ systems }: Props) => {
  const content = systems
    ? intersperse(systems.map(renderSystem), renderSpacer)
    : 'Loading...'
  return (
    <React.Fragment>
      <PageHeader title="Systems" />
      <PageContent>{content}</PageContent>
    </React.Fragment>
  )
}

export default withSystemList(SystemList)
