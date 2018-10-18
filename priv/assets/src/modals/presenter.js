// @flow
import * as React from 'react'
import { connect } from 'r/util/redux'

import { selectModals } from './selectors'

type Props = {
	modals: Array<React.Element<any>>,
}
class ModalsPresenter extends React.Component<Props> {
	render() {
		const { modals } = this.props
		if (!modals.length) {
			return null
		}

		return (
			<div
				css={`
					position: fixed;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					background: rgba(0, 0, 0, 0.3);
				`}
			>
				{modals.map((modal, idx) => React.cloneElement(modal, { key: idx }))}
			</div>
		)
	}
}

export default connect({
	selectors: {
		modals: selectModals,
	},
})(ModalsPresenter)
