// @flow
import { useRouteId } from 'r/util/router'
import createGenericDomain from './create-generic-domain'
import { useCurUser } from './auth'

export type Campaign = {|
	id: number,
	name: string,
	description: string,
	inserted_at: string,
	updated_at: string,
	created_by_id: number,
|}

export type DraftCampaign = $Diff<
	Campaign,
	{|
		id: number,
		inserted_at: string,
		updated_at: string,
		created_by_id: number,
	|}
>

const { Provider, useList, useOne, useMutations } = createGenericDomain<
	DraftCampaign,
	Campaign
>({
	name: 'Campaigns',
	useRootPath: () => '/api/campaigns',
	wrapPost: data => ({ campaign: data }),
	wrapPut: data => ({ campaign: data }),
})
export {
	Provider as CampaignProvider,
	useList as useCampaignList,
	useOne as useCampaign,
	useMutations as useCampaignMutations,
}

export const useCampaignId = () => {
	const campaignId = useRouteId('campaignId')
	if (campaignId == undefined) {
		throw new Error('Could not find campaignId in route match')
	}
	return campaignId
}

export const useCurCampaign = () => useOne(useCampaignId())

export const useIsOwner = (campaign: ?Campaign) => {
	const curUser = useCurUser()
	return campaign ? curUser.id === campaign.created_by_id : false
}
