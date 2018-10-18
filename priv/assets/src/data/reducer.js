// @flow
import { combineReducers } from 'redux'
import campaigns from './campaigns'
import sessions from './sessions'
import nouns from './nouns'
import members from './members'

export default combineReducers({
	campaigns,
	sessions,
	nouns,
	members,
})
