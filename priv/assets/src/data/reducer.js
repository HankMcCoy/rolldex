// @flow
import { combineReducers } from 'redux'
import campaigns from './campaigns'
import sessions from './sessions'
import nouns from './nouns'

export default combineReducers({
  campaigns,
  sessions,
  nouns,
})
