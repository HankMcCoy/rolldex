// @flow
import * as React from 'react'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import TextSection from 'r/components/text-section'
import Spacer from 'r/components/spacer'

import { useSession } from 'r/domains/sessions'
import { useCurCampaign, useIsOwner } from 'r/domains/campaigns'

import { callApi } from 'r/util/api'
import { useRouteId } from 'r/util/router'

import PageWithSidebar from 'r/components/page-with-sidebar'

import RelatedNouns from 'r/components/related-nouns'

export default function SessionDetail() {
	const [session] = useSession(useRouteId('sessionId'))
	const [campaign] = useCurCampaign()
	const isOwner = useIsOwner(campaign)
	if (!session || !campaign) return <LoadingPage />
	const { name, summary, notes, private_notes } = session
	return (
		<>
			<PageHeader
				title={name}
				breadcrumbs={[
					{ text: 'Campaigns', to: '/campaigns' },
					{ text: campaign.name, to: `/campaigns/${campaign.id}` },
				]}
				controls={
					isOwner ? (
						<HeaderLinkButton
							to={`/campaigns/${campaign.id}/sessions/${session.id}/edit`}
							data-id="edit"
							title="Edit (Ctrl/Cmd-E)"
						>
							Edit
						</HeaderLinkButton>
					) : null
				}
			/>
			<PageWithSidebar
				content={
					<>
						<TextSection title="Summary">{summary}</TextSection>
						<Spacer height={25} />
						<TextSection title="Notes" markdown>
							{notes}
						</TextSection>
						{isOwner ? (
							<>
								<Spacer height={25} />
								<TextSection title="Private Notes" markdown>
									{private_notes}
								</TextSection>
							</>
						) : null}
						<Spacer height={25} />
					</>
				}
				sidebar={
					<RelatedNouns
						campaignId={campaign.id}
						getNouns={() =>
							callApi({
								path: `/api/campaigns/${campaign.id}/sessions/${
									session.id
								}/related-nouns`,
								method: 'GET',
							}).then(({ data: nouns }) => nouns)
						}
					/>
				}
			/>
		</>
	)
}
