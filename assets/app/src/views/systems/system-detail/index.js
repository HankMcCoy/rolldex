// @flow
import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import { withProps, mapProps, lifecycle, type HOC } from 'recompose'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import type { System } from 'r/data/systems'
import { selectSystem } from 'r/data/systems/selectors'
import { fetchSystem } from 'r/data/systems/action-creators'
import { connect } from 'r/util/redux'

type Props = {
  system: System | void,
}
function SystemDetail({ system }: Props) {
  return (
    <React.Fragment>
      <PageHeader title={system ? system.name : 'Loading...'} />
      <PageContent>{system ? system.description : 'Loading...'}</PageContent>
    </React.Fragment>
  )
}

type ExternalProps = {
  systemId: number,
}
const enhance: HOC<*, ExternalProps> = flowRight(
  connect({
    actionCreators: {
      fetchSystem,
    },
  }),
  withProps(({ match: { params } }) => ({ systemId: params.systemId })),
  lifecycle({
    componentDidMount() {
      this.props.fetchSystem(this.props.systemId)
    },
  }),
  connect({
    selectors: {
      system: selectSystem(props => props.systemId),
    },
  }),
  mapProps(({ system }) => ({ system })),
)

export default enhance(SystemDetail)
