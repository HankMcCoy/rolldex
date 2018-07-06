// @flow
import { actionXhr } from 'r/util/redux'
import { FETCH_CAMPAIGN_LIST } from './action-types'

export const fetchCampaignList = () =>
  actionXhr({
    actionType: FETCH_CAMPAIGN_LIST,
    method: 'GET',
    path: '/api/campaigns',
  })
