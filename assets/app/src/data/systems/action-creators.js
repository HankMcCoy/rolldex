// @flow
import { actionXhr } from 'r/util/redux'
import { FETCH_SYSTEM_LIST } from './action-types'

export const fetchSystemList = () =>
  actionXhr({
    actionType: FETCH_SYSTEM_LIST,
    method: 'GET',
    path: '/api/systems',
  })
