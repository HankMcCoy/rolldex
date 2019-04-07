// @flow
import { useFetch, post, put, remove } from 'r/util/use-fetch'
import { useCampaignId } from './campaigns'

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

export const useSessionList = () =>
	useFetch<Array<Session>>(`/api/campaigns/${useCampaignId()}/sessions`)
export const useSession = (id: number) =>
	useFetch<Session>(`/api/campaigns/${useCampaignId()}/sessions/${id}`)

export const createSession = (draft: DraftSession) =>
	post({
		path: `/api/campaigns/${draft.campaign_id}/sessions`,
		body: {
			session: draft,
		},
	})
export const updateSession = (session: Session) =>
	put({
		path: `/api/campaigns/${session.campaign_id}/sessions/${session.id}`,
		body: {
			session,
		},
	})
export const deleteSession = (session: Session) =>
	remove({
		path: `/api/campaigns/${session.campaign_id}/sessions/${session.id}`,
	})
