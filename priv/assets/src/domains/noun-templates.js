// @flow
import { useCampaignId } from './campaigns'
import createGenericDomain from './create-generic-domain'

import { type NounType } from './nouns'

export type NounTemplate = {|
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

export type DraftNounTemplate = $Diff<
	NounTemplate,
	{| id: number, inserted_at: string, updated_at: string |}
>

const { Provider, useList, useOne, useMutations } = createGenericDomain<
	DraftNounTemplate,
	NounTemplate
>({
	name: 'NounTemplates',
	useRootPath: () => {
		const campaignId = useCampaignId()
		return `/api/campaigns/${campaignId}/nouns-templates`
	},
	wrapPost: data => ({ noun_template: data }),
	wrapPut: data => ({ noun_template: data }),
})

/**
 * We need to look up the ID for specific noun types in order to render links.
 */
const useNounTemplateIdByType = (nounType: NounType) => {
	const { list } = useList(['id'])
	if (list) {
		const nounTemplate = list.find(nt => nt.noun_type === nounType)
		if (!nounTemplate) {
			throw new Error(`Could not find a matching template for type ${nounType}`)
		}
		return nounTemplate.id
	}
	return undefined
}

/**
 * Templates are always created/deleted by the BE upon campaign
 * creation/deletion so no need to allow creation/deletion here.
 */
const useNounTemplateMutations = () => {
	const { update } = useMutations()
	return { update }
}

export {
	Provider as NounProvider,
	useList as useNounTemplateList,
	useOne as useNounTemplate,
	useNounTemplateIdByType,
	useNounTemplateMutations,
}
