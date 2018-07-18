// @flow
import * as React from 'react'
import { css } from 'emotion'
import styled from 'react-emotion'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import flowRight from 'lodash-es/flowRight'

import { withSystemList } from 'r/data/systems/connectors'
import { withCampaignList } from 'r/data/campaigns/connectors'
import type { Campaign } from 'r/data/campaigns'
import type { System } from 'r/data/systems'
import theme, { fromTheme } from 'r/theme'

const StyledNav = styled.div`
	display: flex;
	flex-direction: column;
`

const ActiveSection = styled.div`
	background: ${fromTheme('gray30')};
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
	systems: Array<System> | void,
	campaigns: Array<Campaign> | void
}
function Nav({ systems, campaigns }: Props) {
	return (
		<StyledNav>
			<Switch>
				<Route path="/systems">
					<ActiveSection>
						<SubAppLink to="/systems">Systems</SubAppLink>
						{systems &&
							systems.map(s => (
								<ChildLink to={`/systems/${s.id}`} activeClassName={active}>
									{s.name}
								</ChildLink>
							))}
					</ActiveSection>
				</Route>
				<Route>
					<SubAppLink to="/systems">Systems</SubAppLink>
				</Route>
			</Switch>
			<Switch>
				<Route path="/campaigns">
					<ActiveSection>
						<SubAppLink to="/campaigns">Campaigns</SubAppLink>
						{campaigns &&
							campaigns.map(c => (
								<ChildLink to={`/campaigns/${c.id}`} activeClassName={active}>
									{c.name}
								</ChildLink>
							))}
					</ActiveSection>
				</Route>
				<Route>
					<SubAppLink to="/campaigns">Campaigns</SubAppLink>
				</Route>
			</Switch>
		</StyledNav>
	)
}

export default flowRight(
	// Including withRouter to force a rerender when the location updates
	withRouter,
	withSystemList,
	withCampaignList
)(Nav)
