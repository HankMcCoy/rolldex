// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'

import { fromTheme } from 'r/theme'

import PageContent from './page-content'

const HorizLayout = styled.div`
	display: flex;
	flex: 1 0 auto;
`

const LeftColumn = styled.div`
	flex: 1 0 0%;
`

const RightColumn = styled.div`
	flex: 0 0 300px;
`

const PageSidebar = styled.div`
	background: ${fromTheme('campaignColorLight')};
	color: ${fromTheme('campaignText')};
	height: 100%;
`

type Props = {
	content: React.Node,
	sidebar: React.Node,
}
export default function PageWithSidebar({ content, sidebar }: Props) {
	return (
		<HorizLayout>
			<LeftColumn>
				<PageContent>{content}</PageContent>
			</LeftColumn>
			<RightColumn>
				<PageSidebar>{sidebar}</PageSidebar>
			</RightColumn>
		</HorizLayout>
	)
}
