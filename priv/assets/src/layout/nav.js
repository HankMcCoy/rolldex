// @flow
import * as React from 'react'
import { css } from 'emotion'
import styled from 'react-emotion'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import flowRight from 'lodash-es/flowRight'

import { withCampaignList } from 'r/data/campaigns/connectors'
import type { Campaign } from 'r/data/campaigns'
import theme, { fromTheme } from 'r/theme'
import { CurUser } from 'r/contexts/auth'
import { UnstyledButton } from 'r/components/button'
import { callApi } from 'r/util/api'

const ActiveSection = styled.div`
	background: ${theme.gray30};
`

const CommonLink = styled(NavLink)`
	display: block;
	color: ${fromTheme('white')};
	text-decoration: none;
	height: 45px;
	line-height: 45px;
`

const SubAppLink = styled(CommonLink)`
	font-size: 24px;
	font-weight: ${fromTheme('contentFont.weights.veryLight')};
	padding-left: ${fromTheme('sidebarHzPadding')}px;
`

const active = css`
	font-weight: ${theme.contentFont.weights.medium};
`

const ChildLink = styled(CommonLink)`
  display: block;
  color: ${fromTheme('white')}
  font-size: 18px;
	padding-left: calc(${fromTheme('sidebarHzPadding')}px + 20px);
  &:not(${active}) {
    font-weight: ${fromTheme('contentFont.weights.light')};
  }
`

type Props = {
	campaigns: Array<Campaign> | void,
}
function Nav({ systems, campaigns }: Props) {
	return (
		<div
			css={`
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
			`}
		>
			<div
				css={`
					display: flex;
					flex-direction: column;
				`}
			>
				<Switch>
					<Route path="/campaigns">
						<ActiveSection>
							<SubAppLink to="/campaigns">Campaigns</SubAppLink>
							{campaigns &&
								campaigns.map(c => (
									<ChildLink
										key={c.id}
										to={`/campaigns/${c.id}`}
										activeClassName={active}
									>
										{c.name}
									</ChildLink>
								))}
						</ActiveSection>
					</Route>
					<Route>
						<SubAppLink to="/campaigns">Campaigns</SubAppLink>
					</Route>
				</Switch>
			</div>
			<div
				css={`
					display: flex;
					justify-content: space-between;
				`}
			>
				<div
					css={`
						padding: 5px 10px;
						color: #b5b5b6;
						font-size: 16px;
						font-weight: 500;
					`}
				>
					<CurUser>{curUser => curUser && curUser.email}</CurUser>
				</div>
				<UnstyledButton
					css={`
						padding: 5px 10px;
						color: #b5b5b6;
						font-size: 14px;
						font-weight: 500;
						transition: color 0.2s;
						text-transform: uppercase;
						letter-spacing: 0.5px;
						margin-top: 1px;
						&:hover {
							color: #fff;
						}
					`}
					onClick={() => {
						callApi({
							method: 'POST',
							path: '/api/users/sign-out',
						}).then(() => {
							window.location = '/login'
						})
					}}
				>
					Log out
				</UnstyledButton>
			</div>
		</div>
	)
}

export default flowRight(
	// Including withRouter to force a rerender when the location updates
	withRouter,
	withCampaignList
)(Nav)
