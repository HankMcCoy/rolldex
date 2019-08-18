import { $Diff } from 'utility-types'
import { useRouteId } from 'r/util/router'
import { useFetch, post, put } from 'r/util/use-fetch'
import { useCurUser } from './auth'

export type Campaign = {
	id: number
	name: string
	description: string
	inserted_at: string
	updated_at: string
	created_by_id: number
}

export type DraftCampaign = $Diff<
	Campaign,
	{
		id: number
		inserted_at: string
		updated_at: string
		created_by_id: number
	}
>

export const useCampaignId = (): number => {
	const campaignId = useRouteId('campaignId')
	if (campaignId === undefined) {
		throw new Error('Could not find campaignId in route match')
	}
	return campaignId as number
}
export const useIsOwner = (campaign: Campaign) => {
	const curUser = useCurUser()
	return campaign ? curUser.id === campaign.created_by_id : false
}

export const useCampaignList = () => useFetch<Array<Campaign>>('/api/campaigns')
export const useCampaign = (id: number) =>
	useFetch<Campaign>(`/api/campaigns/${id}`)
export const useCurCampaign = () => useCampaign(useCampaignId())

export const createCampaign = (draft: DraftCampaign) =>
	post<Campaign>({ path: '/api/campaigns', body: { campaign: draft } })

export const updateCampaign = (campaign: Campaign) =>
	put<Campaign>({ path: '/api/campaigns', body: { campaign } })
