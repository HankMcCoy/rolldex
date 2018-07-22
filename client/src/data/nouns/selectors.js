// @flow

import sortBy from 'lodash-es/sortBy'
import { createSelector } from 'reselect'
import type { State } from './index'

export const selectNounsById = (state: any): State => state.data.nouns
export const selectNounList = (getCampaignId: (*) => number) =>
  createSelector(
    [selectNounsById, (_, props) => getCampaignId(props)],
    (nounsMap: State, campaignId: number) => {
      const allNouns = Object.keys(nounsMap).map(k => nounsMap[+k])
      const nounsForCampaign = allNouns.filter(
        s => s.campaign_id === campaignId,
      )
      return sortBy(nounsForCampaign, ['inserted_at'])
    },
  )

export const selectNoun = (getId: (*) => number) =>
  createSelector(
    [selectNounsById, (_, props) => getId(props)],
    (nounsById, id) => nounsById[id],
  )
