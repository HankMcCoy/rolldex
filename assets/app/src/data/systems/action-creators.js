// @flow
import { actionXhr } from 'r/util/redux'
import { FETCH_SYSTEM_LIST, FETCH_SYSTEM } from './action-types'

export const fetchSystemList = () =>
  actionXhr({
    actionType: FETCH_SYSTEM_LIST,
    method: 'GET',
    path: '/api/systems',
  })

export const fetchSystem = (id: number) =>
  actionXhr({
    actionType: FETCH_SYSTEM,
    method: 'GET',
    path: `/api/systems/${id}`,
  })
