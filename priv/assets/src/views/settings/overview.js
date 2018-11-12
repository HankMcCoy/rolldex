// @flow
import * as React from 'react'

import PageHeader from 'r/components/page-header'
import PageContent from 'r/components/page-content'
import H2 from 'r/components/h2'
import { List } from 'r/components/lists'
import Spacer from 'r/components/spacer'
import PlainLink from 'r/components/plain-link'
import NotableCard from 'r/components/notable-card'

export default () => (
	<React.Fragment>
		<PageHeader title="Settings" />
		<PageContent>
			<div
				css={`
					max-width: 400px;
				`}
			>
				<H2>Templates</H2>
				<Spacer height={10} />
				<List>
					<PlainLink to="/settings/templates/sessions" display="block">
						<NotableCard title="Sessions" />
					</PlainLink>
					<PlainLink to="/settings/templates/people" display="block">
						<NotableCard title="People" />
					</PlainLink>
					<PlainLink to="/settings/templates/factions" display="block">
						<NotableCard title="Factions" />
					</PlainLink>
					<PlainLink to="/settings/templates/places" display="block">
						<NotableCard title="Places" />
					</PlainLink>
					<PlainLink to="/settings/templates/things" display="block">
						<NotableCard title="Things" />
					</PlainLink>
				</List>
			</div>
		</PageContent>
	</React.Fragment>
)
