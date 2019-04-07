// @flow
import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import flowRight from 'lodash-es/flowRight'
import sortBy from 'lodash-es/sortBy'

import { useCampaignList } from 'r/domains/campaigns'
import theme, { fromTheme } from 'r/theme'
import { useCurUser } from 'r/domains/auth'
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

const ChildLink = styled(CommonLink)`
  display: block;
  color: ${fromTheme('white')}
  font-size: 18px;
	padding-left: calc(${fromTheme('sidebarHzPadding')}px + 20px);
  font-weight: ${fromTheme('contentFont.weights.light')};
`

function Nav() {
	const [campaigns] = useCampaignList()
	const curUser = useCurUser()
	return (
		<div
			css={css`
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;
			`}
		>
			<div
				css={css`
					display: flex;
					flex-direction: column;
				`}
			>
				<Switch>
					<Route path="/campaigns">
						<ActiveSection>
							<SubAppLink to="/campaigns">Campaigns</SubAppLink>
							{campaigns &&
								sortBy(campaigns, 'name').map(c => (
									<ChildLink
										key={c.id}
										to={`/campaigns/${c.id}`}
										activeStyle={{
											fontWeight: theme.contentFont.weights.medium,
										}}
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
				css={css`
					display: flex;
					justify-content: space-between;
				`}
			>
				<div
					css={css`
						padding: 5px 10px;
						color: #b5b5b6;
						font-size: 16px;
						font-weight: 500;
					`}
				>
					{curUser.email}
				</div>
				<UnstyledButton
					css={css`
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
	withRouter
)(Nav)
