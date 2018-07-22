// @flow

import sortBy from 'lodash-es/sortBy'
import { createSelector } from 'reselect'

export const selectSystemsById = (state: any) => state.data.systems
export const selectSystemList = createSelector(selectSystemsById, c =>
  sortBy(Object.values(c), ['inserted_at']),
)

export const selectSystem = (getId: (*) => number) =>
  createSelector(
    selectSystemsById,
    (_, props) => getId(props),
    (systemsById, id) => systemsById[id],
  )
