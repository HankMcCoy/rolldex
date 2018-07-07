// @flow
import { actionXhr } from 'r/util/redux'
import { FETCH_SYSTEM_LIST, FETCH_SYSTEM } from './action-types'
import type { System } from './index'

type SystemJson = $Rest<System, {| id: number |}> & { id: string }
const transformSystem = ({ id, ...rest }: SystemJson): System => ({
  ...rest,
  id: parseInt(id, 10),
})

export const fetchSystemList = () =>
  actionXhr({
    actionType: FETCH_SYSTEM_LIST,
    method: 'GET',
    path: '/api/systems',
    transformSuccessPayload: systems => systems.map(transformSystem),
  })

export const fetchSystem = (id: number) =>
  actionXhr({
    actionType: FETCH_SYSTEM,
    method: 'GET',
    path: `/api/systems/${id}`,
    transformSuccessPayload: transformSystem,
  })
