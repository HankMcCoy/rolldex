// @flow
import { actionXhr } from 'r/util/redux'
import {
  CREATE_SESSION,
  UPDATE_SESSION,
  FETCH_SESSION_LIST,
  FETCH_SESSION,
} from './action-types'
import type { Session, DraftSession } from './index'

export const fetchSessionList = (campaignId: number) =>
  actionXhr({
    actionType: FETCH_SESSION_LIST,
    method: 'GET',
    path: `/api/campaigns/${campaignId}/sessions`,
  })

export const fetchSession = (campaignId: number, id: number) =>
  actionXhr({
    actionType: FETCH_SESSION,
    method: 'GET',
    path: `/api/campaigns/${campaignId}/sessions/${id}`,
  })

export const createSession = (draftSession: DraftSession) =>
  actionXhr({
    actionType: CREATE_SESSION,
    method: 'POST',
    path: `/api/campaigns/${draftSession.campaign_id}/sessions`,
    requestBody: { session: draftSession },
  })

export const updateSession = (session: Session) =>
  actionXhr({
    actionType: UPDATE_SESSION,
    method: 'PUT',
    path: `/api/campaigns/${session.campaign_id}/sessions/${session.id}`,
    requestBody: { session },
  })
