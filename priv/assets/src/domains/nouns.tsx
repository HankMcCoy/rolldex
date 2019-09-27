import { $Diff } from 'utility-types'
import { useFetch, post, put, remove } from '../util/use-fetch'
import { useCampaignId } from './campaigns'
import { getFromList } from './util'

export type NounType = 'PERSON' | 'PLACE' | 'THING' | 'FACTION'
export type Noun = {
	id: number
	name: string
	campaign_id: number
	noun_type: NounType
	summary: string
	notes: string
	private_notes: string
	inserted_at: string
	updated_at: string
}

export type DraftNoun = $Diff<
	Noun,
	{ id: number; inserted_at: string; updated_at: string }
>

export const useNounList = () =>
	useFetch<Array<Noun>>(`/api/campaigns/${useCampaignId()}/nouns`)
export const useNoun = (id: number): [Noun, undefined] | [undefined, Error] => {
	const results = useNounList()
	return getFromList(results, id)
}

export const createNoun = (draft: DraftNoun) =>
	post<Noun>({
		path: `/api/campaigns/${draft.campaign_id}/nouns`,
		body: {
			noun: draft,
		},
	})
export const updateNoun = (noun: Noun) =>
	put<Noun>({
		path: `/api/campaigns/${noun.campaign_id}/nouns/${noun.id}`,
		body: {
			noun,
		},
	})
export const deleteNoun = (noun: Noun) =>
	remove({ path: `/api/campaigns/${noun.campaign_id}/nouns/${noun.id}` })
