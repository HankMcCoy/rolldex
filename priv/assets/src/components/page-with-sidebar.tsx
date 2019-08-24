import * as React from 'react'
import styled from 'styled-components/macro'

import theme from 'r/theme'

import PageContent from './page-content'

const { breakpoints } = theme

const HorizLayout = styled.div`
	display: flex;
	flex: 1 0 auto;
	@media (max-width: ${breakpoints.phone}px) {
		flex-direction: column;
	}
`

const LeftColumn = styled.div`
	flex: 1 0 0%;
	@media (max-width: ${breakpoints.phone}px) {
		flex: 0 0 auto;
	}
`

const RightColumn = styled.div`
	flex: 0 0 300px;
	@media (max-width: ${breakpoints.phone}px) {
		flex: 0 0 auto;
	}
`

const PageSidebar = styled.div`
	background: ${theme.campaignColorLight};
	color: ${theme.campaignText};
	height: 100%;
	padding-bottom: 20px;
	min-height: 500px;
`

type Props = {
	content: React.ReactNode
	sidebar: React.ReactNode
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
