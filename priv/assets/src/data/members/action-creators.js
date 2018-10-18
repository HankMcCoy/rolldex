// @flow
import { actionXhr } from 'r/util/redux'
import { CREATE_MEMBER, FETCH_MEMBER_LIST, REMOVE_MEMBER } from './action-types'
import type { DraftMember } from './index'

export const fetchMemberList = (campaignId: number) =>
	actionXhr({
		actionType: FETCH_MEMBER_LIST,
		method: 'GET',
		path: `/api/campaigns/${campaignId}/members`,
	})

export const createMember = (draftMember: DraftMember) =>
	actionXhr({
		actionType: CREATE_MEMBER,
		method: 'POST',
		path: `/api/campaigns/${draftMember.campaign_id}/members`,
		requestBody: { member: draftMember },
	})

export const removeMember = (campaignId: number, memberId: number) =>
	actionXhr({
		actionType: REMOVE_MEMBER,
		method: 'DELETE',
		path: `/api/campaigns/${campaignId}/members/${memberId}`,
		initialPayload: memberId,
	})
