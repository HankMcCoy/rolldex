import { $Diff } from 'utility-types'
import { useFetch, post, put, remove } from '../util/use-fetch'
import { useCampaignId } from './campaigns'
import { getFromList } from './util'

export type Session = {
	id: number
	name: string
	campaign_id: number
	summary: string
	notes: string
	private_notes: string
	inserted_at: string
	updated_at: string
}

export type DraftSession = $Diff<
	Session,
	{ id: number; inserted_at: string; updated_at: string }
>

export const useSessionList = () =>
	useFetch<Array<Session>>(`/api/campaigns/${useCampaignId()}/sessions`)

export const useSession = (
	id: number
): [Session, undefined] | [undefined, Error] => {
	const results = useSessionList()
	return getFromList(results, id)
}

export const createSession = (draft: DraftSession) =>
	post<Session>({
		path: `/api/campaigns/${draft.campaign_id}/sessions`,
		body: {
			session: draft,
		},
	})
export const updateSession = (session: Session) =>
	put<Session>({
		path: `/api/campaigns/${session.campaign_id}/sessions/${session.id}`,
		body: {
			session,
		},
	})
export const deleteSession = (session: Session) =>
	remove({
		path: `/api/campaigns/${session.campaign_id}/sessions/${session.id}`,
	})
