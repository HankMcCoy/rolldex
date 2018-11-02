// @flow
import { useCampaignId } from './campaigns'
import createGenericDomain from './create-generic-domain'

export type NounType = 'PERSON' | 'PLACE' | 'THING' | 'FACTION'
export type Noun = {|
	id: number,
	name: string,
	campaign_id: number,
	noun_type: NounType,
	summary: string,
	notes: string,
	private_notes: string,
	inserted_at: string,
	updated_at: string,
|}

export type DraftNoun = $Diff<
	Noun,
	{| id: number, inserted_at: string, updated_at: string |}
>

const { Provider, useList, useOne, useMutations } = createGenericDomain<
	DraftNoun,
	Noun
>({
	name: 'Nouns',
	useRootPath: () => {
		const campaignId = useCampaignId()
		return `/api/campaigns/${campaignId}/nouns`
	},
	wrapPost: data => ({ noun: data }),
	wrapPut: data => ({ noun: data }),
})

export {
	Provider as NounProvider,
	useList as useNounList,
	useOne as useNoun,
	useMutations as useNounMutations,
}
