// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import type { System } from 'r/data/systems'
import { selectSystemList } from 'r/data/systems/selectors'
import { fetchSystemList } from 'r/data/systems/action-creators'

export const withSystemList: HOC<
  *,
  { systems: Array<System> | void },
> = flowRight(
  connect({
    actionCreators: {
      fetchSystemList,
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchSystemList()
    },
  }),
  mapProps(props => omit(props, 'fetchSystemList')),
  connect({
    selectors: {
      systems: selectSystemList,
    },
  }),
)
