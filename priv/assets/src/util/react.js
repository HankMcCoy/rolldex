import { type HOC, lifecycle } from 'recompose'
import isEqual from 'lodash-es/isEqual'

export function handleIdChange<T>({ getId, handleChange }): HOC<T, void> {
	return lifecycle({
		componentDidMount() {
			handleChange(this.props)
		},
		componentDidUpdate(prevProps) {
			if (!isEqual(getId(prevProps), getId(this.props))) {
				handleChange(this.props)
			}
		},
	})
}
