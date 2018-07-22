// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import type { System } from 'r/data/systems'
import { selectSystem, selectSystemList } from 'r/data/systems/selectors'
import { fetchSystem, fetchSystemList } from 'r/data/systems/action-creators'

export const withSystem: <T>(
	(T) => number
) => HOC<T, { campaign: System }> = getId =>
	flowRight(
		connect({
			actionCreators: {
				fetchSystem
			}
		}),
		lifecycle({
			componentDidMount() {
				this.props.fetchSystem(getId(this.props))
			}
		}),
		mapProps(props => omit(props, ['fetchSystem', 'campaignId'])),
		connect({
			selectors: {
				campaign: selectSystem(getId)
			}
		})
	)

export const withSystemList: HOC<
	*,
	{ systems: Array<System> | void }
> = flowRight(
	connect({
		actionCreators: {
			fetchSystemList
		}
	}),
	lifecycle({
		componentDidMount() {
			this.props.fetchSystemList()
		}
	}),
	mapProps(props => omit(props, 'fetchSystemList')),
	connect({
		selectors: {
			systems: selectSystemList
		}
	})
)
