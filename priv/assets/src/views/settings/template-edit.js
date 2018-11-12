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
		<PageHeader
			title="Edit Template"
			breadcrumbs={[{ text: 'Settings', to: '/settings' }]}
		/>
		<PageContent>
			<div
				css={`
					max-width: 400px;
				`}
			>
				Edit things
			</div>
		</PageContent>
	</React.Fragment>
)
