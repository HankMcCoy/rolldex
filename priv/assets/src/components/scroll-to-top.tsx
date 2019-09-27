import * as React from 'react'
import ReactDOM from 'react-dom'
import { Location } from 'history'
import { withRouter } from 'react-router-dom'

interface Props {
	location: Location
	children: any
}
class ScrollToTop extends React.Component<Props> {
	componentDidUpdate(prevProps: Props) {
		const el = ReactDOM.findDOMNode(this)
		if (
			this.props.location !== prevProps.location &&
			el instanceof HTMLElement
		) {
			el.scrollTop = 0
		}
	}

	render() {
		return this.props.children
	}
}

export default withRouter(ScrollToTop)
