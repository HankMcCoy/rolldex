import { HOC, lifecycle } from 'recompose'
import isEqual from 'lodash-es/isEqual'

export function handleIdChange<T>({ getId, handleChange }): HOC<T, void> {
	return lifecycle({
		componentDidMount() {
			handleChange.call(this, this.props)
		},
		componentDidUpdate(prevProps) {
			if (!isEqual(getId(prevProps), getId(this.props))) {
				handleChange.call(this, this.props)
			}
		},
	})
}
