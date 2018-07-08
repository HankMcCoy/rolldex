// @flow
import { actionXhr } from 'r/util/redux'
import {
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  FETCH_CAMPAIGN_LIST,
  FETCH_CAMPAIGN,
} from './action-types'
import type { DraftCampaign } from './index'

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

export const createCampaign = (draftCampaign: DraftCampaign) =>
  actionXhr({
    actionType: CREATE_CAMPAIGN,
    method: 'POST',
    path: '/api/campaigns',
    requestBody: { campaign: draftCampaign },
  })

export const updateCampaign = (campaign: Campaign) =>
  actionXhr({
    actionType: UPDATE_CAMPAIGN,
    method: 'PUT',
    path: `/api/campaigns/${campaign.id}`,
    requestBody: { campaign },
  })
