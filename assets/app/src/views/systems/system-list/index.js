// @flow
import * as React from 'react'
import styled from 'react-emotion'

import { intersperse } from 'r/util'
import { connect } from 'r/util/redux'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import Spacer from 'r/components/spacer'
import type { System } from 'r/data/systems'
import { selectSystemList } from 'r/data/systems/selectors'
import { fetchSystemList } from 'r/data/systems/action-creators'

import SystemCard from './system-card'

type Props = {
  systems: Array<System> | void,
  fetchSystemList: () => void,
}
class SystemList extends React.Component<Props> {
  render() {
    const { systems } = this.props

    const content = systems
      ? intersperse(
          systems.map(s => <SystemCard system={s} key={s.id} />),
          i => <Spacer height={10} key={`spacer-${i}`} />,
        )
      : 'Loading...'
    return (
      <React.Fragment>
        <PageHeader title="Systems" />
        <PageContent>{content}</PageContent>
      </React.Fragment>
    )
  }
  componentDidMount() {
    this.props.fetchSystemList()
  }
}

export default connect({
  selectors: {
    systems: selectSystemList,
  },
  actionCreators: {
    fetchSystemList,
  },
})(SystemList)
