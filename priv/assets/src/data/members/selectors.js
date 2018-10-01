// @flow

import sortBy from 'lodash-es/sortBy'
import { createSelector } from 'reselect'
import type { State } from './index'

export const selectMembersById = (state: any): State => state.data.members
export const selectMemberList = (getCampaignId: (*) => number) =>
  createSelector(
    [selectMembersById, (_, props) => getCampaignId(props)],
    (membersMap: State, campaignId: number) => {
      const allMembers = Object.keys(membersMap).map(k => membersMap[+k])
      const membersForCampaign = allMembers.filter(
        s => s.campaign_id === campaignId
      )
      return sortBy(membersForCampaign, ['inserted_at'])
    }
  )
