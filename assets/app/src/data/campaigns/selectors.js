// @flow

import sortBy from 'lodash-es/sortBy'
import { createSelector } from 'reselect'

export const selectCampaignsById = (state: any) => state.data.campaigns
export const selectCampaignList = createSelector(selectCampaignsById, c =>
  sortBy(Object.values(c), ['inserted_at']),
)
