// @flow
import { useCampaignId } from './campaigns'
import createGenericDomain from './create-generic-domain'

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

const { Provider, useList, useOne, useMutations } = createGenericDomain<
	DraftMember,
	Member
>({
	name: 'Members',
	useRootPath: () => {
		const campaignId = useCampaignId()
		return `/api/campaigns/${campaignId}/members`
	},
	wrapPost: data => ({ member: data }),
	wrapPut: data => ({ member: data }),
})

export {
	Provider as MemberProvider,
	useList as useMemberList,
	useOne as useMember,
	useMutations as useMemberMutations,
}
