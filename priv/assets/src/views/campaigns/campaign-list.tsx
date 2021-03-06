import * as React from 'react'

import { intersperse } from 'r/util'
import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import { Spacer } from 'r/components/spacer'
import AddBtn from 'r/components/add-btn'
import ListCard from 'r/components/list-card'
import PlainLink from 'r/components/plain-link'
import TitleNSummary from 'r/components/title-n-summary'
import { useCampaignList, Campaign } from 'r/domains/campaigns'

function CampaignCard({ campaign }: { campaign: Campaign }) {
	return (
		<PlainLink to={`/campaigns/${campaign.id}`}>
			<ListCard>
				<TitleNSummary title={campaign.name} summary={campaign.description} />
			</ListCard>
		</PlainLink>
	)
}

type Props = {
	campaigns: Array<Campaign> | void
}
function CampaignList({ campaigns }: Props) {
	const [campaignList] = useCampaignList()
	return (
		<>
			<PageHeader
				title="Campaigns"
				controls={<AddBtn to="/campaigns/add" inverted />}
			/>
			<PageContent>
				{campaignList
					? intersperse(
							campaignList.map(c => <CampaignCard campaign={c} key={c.id} />),
							i => <Spacer height={10} key={`spacer-${i}`} />
					  )
					: 'Loading...'}
			</PageContent>
		</>
	)
}

export default CampaignList
