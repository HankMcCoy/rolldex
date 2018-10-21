// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { type Match, withRouter, Link } from 'react-router-dom'

import H1 from 'r/components/h1'
import Spacer from 'r/components/spacer'
import { LinkButton } from 'r/components/button'
import theme, { fromTheme } from 'r/theme'
import ArrowSvg from 'r/svg/arrow'
import { getSubAppColor, intersperse } from 'r/util'

const Root = styled('div')`
	background: ${getSubAppColor};
	height: ${fromTheme('topBarHeight')};
	flex: 0 0 ${fromTheme('topBarHeight')};
	line-height: ${fromTheme('topBarHeight')};
	padding-left: ${fromTheme('pageHzPadding')};
	padding-right: ${fromTheme('pageHzPadding')};
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Left = styled('div')`
	flex: 0 0 auto;
`

const Right = styled('div')`
	flex: 0 0 auto;
`

const Heading = styled(H1)`
	height: 40px;
	line-height: 30px;
	color: ${fromTheme('white')};
`

const BreadcrumbsWrapper = styled.div`
	display: flex;
	opacity: 0.85;
`

const Breadcrumb = styled(Link)`
	height: 40px;
	line-height: 40px;
	text-decoration: none;
	color: ${fromTheme('white')};
`

const Separator = () => (
	<div
		css={`
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			width: 15px;
			stroke: ${theme.white};
			position: relative;
			top: 1px;
			& > svg {
				width: 50%;
			}
		`}
	>
		<ArrowSvg />
	</div>
)

export const HeaderButton = styled(LinkButton)`
	width: auto;
	height: 45px;
	padding: 0 15px;
	border: 1px solid ${fromTheme('white')};
	color: ${fromTheme('white')};
`

type BreadcrumbDesc = {
	text: string,
	to: string,
}
type ExternalProps = {|
	title: string,
	breadcrumbs?: Array<BreadcrumbDesc>,
	controls?: React.Node,
|}
type RouterProps = {
	match: Match,
}
function PageHeader({
	title,
	match,
	breadcrumbs,
	controls,
}: ExternalProps & RouterProps) {
	return (
		<Root match={match}>
			<Left>
				<Spacer height={10} />
				{breadcrumbs && (
					<BreadcrumbsWrapper>
						{intersperse(
							breadcrumbs.map(({ text, to }, i) => (
								<Breadcrumb key={i} to={to}>
									{text}
								</Breadcrumb>
							)),
							i => <Separator key={`sep-${i}`} />
						)}
					</BreadcrumbsWrapper>
				)}
				<Heading>{title}</Heading>
				<Spacer height={10} />
			</Left>
			<Right>{controls}</Right>
		</Root>
	)
}

const PageHeaderExport: React$ComponentType<ExternalProps> = withRouter(
	PageHeader
)
export default PageHeaderExport
