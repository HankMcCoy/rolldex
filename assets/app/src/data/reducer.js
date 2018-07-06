// @flow
import { combineReducers } from 'redux'
import campaigns from './campaigns'
import systems from './systems'
import sessions from './sessions'

export default combineReducers({
  campaigns,
  sessions,
  systems,
})
