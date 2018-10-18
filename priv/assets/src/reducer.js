// @flow
import { combineReducers } from 'redux'

import data from './data/reducer'
import modals from './modals/reducer'

export default combineReducers({
	data,
	modals,
})
