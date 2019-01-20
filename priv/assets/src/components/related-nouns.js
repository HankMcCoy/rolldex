// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { withState, lifecycle, mapProps } from 'recompose'

import type { Noun } from 'r/domains/nouns'

import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

const Root = styled.div`
	padding: 20px;
	padding-bottom: 0;
	& > *:not(:last-child) {
		margin-bottom: 25px;
	}
`
const NounGroup = styled.div``

const NounList = styled.ul`
	& > *:not(:last-child) {
		margin-bottom: 15px;
	}
`

const UnstyledLink = styled(Link)`
	text-decoration: none;
`

const NounLink = ({ noun, campaignId }) => (
	<li>
		<UnstyledLink to={`/campaigns/${campaignId}/nouns/${noun.id}`}>
			- {noun.name}
		</UnstyledLink>
	</li>
)

type Props = {
	nouns: Array<Noun> | void,
	campaignId: number,
}
function NounsInSession({ nouns, campaignId }: Props) {
	if (!nouns) return 'Loading...'
	const people = nouns.filter(n => n.noun_type === 'PERSON')
	const places = nouns.filter(n => n.noun_type === 'PLACE')
	const things = nouns.filter(n => n.noun_type === 'THING')
	const factions = nouns.filter(n => n.noun_type === 'FACTION')

	return (
		<Root>
			{people.length ? (
				<NounGroup>
					<H2>People</H2>
					<Spacer height={15} />
					<NounList>
						{people.map(noun => (
							<NounLink key={noun.id} noun={noun} campaignId={campaignId} />
						))}
					</NounList>
				</NounGroup>
			) : null}
			{factions.length ? (
				<NounGroup>
					<H2>Factions</H2>
					<Spacer height={15} />
					<NounList>
						{factions.map(noun => (
							<NounLink key={noun.id} noun={noun} campaignId={campaignId} />
						))}
					</NounList>
				</NounGroup>
			) : null}
			{places.length ? (
				<NounGroup>
					<H2>Places</H2>
					<Spacer height={15} />
					<NounList>
						{places.map(noun => (
							<NounLink key={noun.id} noun={noun} campaignId={campaignId} />
						))}
					</NounList>
				</NounGroup>
			) : null}
			{things.length ? (
				<NounGroup>
					<H2>Things</H2>
					<Spacer height={15} />
					<NounList>
						{things.map(noun => (
							<NounLink key={noun.id} noun={noun} campaignId={campaignId} />
						))}
					</NounList>
				</NounGroup>
			) : null}
		</Root>
	)
}

export default flowRight(
	withState('nouns', 'setNouns', []),
	lifecycle({
		componentDidMount() {
			const { getNouns, setNouns } = this.props
			getNouns().then(setNouns)
		},
	}),
	mapProps(props => omit(props, ['setNouns']))
)(NounsInSession)
