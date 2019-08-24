import * as React from 'react'
import styled from 'styled-components/macro'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import sortBy from 'lodash-es/sortBy'

import { useCampaignList } from 'r/domains/campaigns'
import theme from 'r/theme'
import { useCurUser } from 'r/domains/auth'
import { UnstyledButton } from 'r/components/button'
import { callApi } from 'r/util/api'

const ActiveSection = styled.div`
	background: ${theme.gray30};
`

const CommonLink = styled(NavLink)`
	display: block;
	color: ${theme.white};
	text-decoration: none;
	height: 45px;
	line-height: 45px;
`

const SubAppLink = styled(CommonLink)`
	font-size: 24px;
	font-weight: ${theme.contentFont.weights.veryLight};
	padding-left: ${theme.sidebarHzPadding}px;
`

const ChildLink = styled(CommonLink)`
  display: block;
  color: ${theme.white}
  font-size: 18px;
	padding-left: calc(${theme.sidebarHzPadding}px + 20px);
  font-weight: ${theme.contentFont.weights.light};
`

function Nav() {
	const [campaigns] = useCampaignList()
	const curUser = useCurUser()
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
				{/* SUPER LEGIT FEATURE FLAG */}
				{curUser.email === 'thomas.beirne@gmail.com' && (
					<Switch>
						<Route path="/systems">
							<ActiveSection>
								<SubAppLink to="/systems">Systems</SubAppLink>
							</ActiveSection>
						</Route>
						<Route>
							<SubAppLink to="/systems">Systems</SubAppLink>
						</Route>
					</Switch>
				)}
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
					{curUser.email}
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
							window.location.href = '/login'
						})
					}}
				>
					Log out
				</UnstyledButton>
			</div>
		</div>
	)
}

// Including withRouter to force a rerender when the location updates
export default withRouter(Nav)
