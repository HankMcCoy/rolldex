// @flow
import { actionXhr } from 'r/util/redux'
import {
  CREATE_NOUN,
  UPDATE_NOUN,
  FETCH_NOUN_LIST,
  FETCH_NOUN,
} from './action-types'
import type { Noun, DraftNoun } from './index'

export const fetchNounList = (campaignId: number) =>
  actionXhr({
    actionType: FETCH_NOUN_LIST,
    method: 'GET',
    path: `/api/campaigns/${campaignId}/nouns`,
  })

export const fetchNoun = (campaignId: number, id: number) =>
  actionXhr({
    actionType: FETCH_NOUN,
    method: 'GET',
    path: `/api/campaigns/${campaignId}/nouns/${id}`,
  })

export const createNoun = (draftNoun: DraftNoun) =>
  actionXhr({
    actionType: CREATE_NOUN,
    method: 'POST',
    path: `/api/campaigns/${draftNoun.campaign_id}/nouns`,
    requestBody: { noun: draftNoun },
  })

export const updateNoun = (noun: Noun) =>
  actionXhr({
    actionType: UPDATE_NOUN,
    method: 'PUT',
    path: `/api/campaigns/${noun.campaign_id}/nouns/${noun.id}`,
    requestBody: { noun },
  })
