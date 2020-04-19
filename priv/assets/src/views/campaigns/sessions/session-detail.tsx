import * as React from 'react'

import PageHeader, { HeaderLinkButton } from 'r/components/page-header'
import LoadingPage from 'r/components/loading-page'
import { TextSection, PrivateTextSection } from 'r/components/text-section'
import { Spacer } from 'r/components/spacer'

import { useSession } from 'r/domains/sessions'
import { useCurCampaign, useIsOwner } from 'r/domains/campaigns'

import { useRouteIdOrDie } from 'r/util/router'

import PageWithSidebar from 'r/components/page-with-sidebar'

import RelatedNouns from 'r/components/related-nouns'

export default function SessionDetail() {
	const [session] = useSession(useRouteIdOrDie('sessionId'))
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
								<PrivateTextSection title="Private Notes" markdown>
									{private_notes}
								</PrivateTextSection>
							</>
						) : null}
						<Spacer height={25} />
					</>
				}
				sidebar={
					<RelatedNouns
						path={`/api/campaigns/${campaign.id}/sessions/${session.id}/related-nouns`}
					/>
				}
			/>
		</>
	)
}
