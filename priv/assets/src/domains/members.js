// @flow
import { useFetch, post, put, remove } from 'r/util/use-fetch'
import { useCampaignId } from './campaigns'

export type MemberType = 'READ_ONLY'
export type Member = {|
	id: number,
	inserted_at: string,
	updated_at: string,

	user_id: number,
	campaign_id: number,
	email: string,
	member_type: MemberType,
|}

export type DraftMember = $Diff<
	Member,
	{| id: number, inserted_at: string, updated_at: string, user_id: number |}
>

export const useMemberList = () =>
	useFetch<Array<Member>>(`/api/campaigns/${useCampaignId()}/members`)
export const useMember = (id: number) =>
	useFetch<Member>(`/api/campaigns/${useCampaignId()}/members/${id}`)

export const createMember = (draft: DraftMember) =>
	post<Member>({
		path: `/api/campaigns/${draft.campaign_id}/members`,
		body: {
			member: draft,
		},
	})
export const updateMember = (member: Member) =>
	put<Member>({
		path: `/api/campaigns/${member.campaign_id}/members/${member.id}`,
		body: {
			member,
		},
	})
export const deleteMember = (member: Member) =>
	remove({ path: `/api/campaigns/${member.campaign_id}/members/${member.id}` })
