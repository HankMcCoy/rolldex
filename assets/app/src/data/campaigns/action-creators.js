// @flow
import { actionXhr } from 'r/util/redux'
import { FETCH_CAMPAIGN_LIST, FETCH_CAMPAIGN } from './action-types'

export const fetchCampaignList = () =>
  actionXhr({
    actionType: FETCH_CAMPAIGN_LIST,
    method: 'GET',
    path: '/api/campaigns',
  })

export const fetchCampaign = (id: number) =>
  actionXhr({
    actionType: FETCH_CAMPAIGN,
    method: 'GET',
    path: `/api/campaigns/${id}`,
  })
