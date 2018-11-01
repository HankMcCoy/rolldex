// @flow
import { useCampaignId } from './campaigns'
import createGenericDomain from './create-generic-domain'

export type Session = {|
	id: number,
	name: string,
	campaign_id: number,
	summary: string,
	notes: string,
	private_notes: string,
	inserted_at: string,
	updated_at: string,
|}

export type DraftSession = $Diff<
	Session,
	{| id: number, inserted_at: string, updated_at: string |}
>

const { Provider, useList, useOne, useMutations } = createGenericDomain<
	DraftSession,
	Session
>({
	name: 'Sessions',
	useRootPath: () => {
		const campaignId = useCampaignId()
		return `/api/campaigns/${campaignId}/sessions`
	},
	wrapPost: data => ({ session: data }),
	wrapPut: data => ({ session: data }),
})

export {
	Provider as SessionProvider,
	useList as useSessionList,
	useOne as useSession,
	useMutations as useSessionMutations,
}
