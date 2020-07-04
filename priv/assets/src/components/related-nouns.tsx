import * as React from 'react'
import styled from 'styled-components/macro'
import sortBy from 'lodash-es/sortBy'

import { Noun, NounType } from 'r/domains/nouns'

import { H2 } from 'r/components/heading'
import { Spacer } from 'r/components/spacer'
import { StyledMarkdown } from 'r/components/text-section'
import PlainLink from 'r/components/plain-link'
import { Tooltip } from 'r/components/tooltip'

const Root = styled.div`
	padding: 20px;
	padding-bottom: 0;
	& > *:not(:last-child) {
		margin-bottom: 25px;
	}
`
const NounGroup = styled.div``

const NounList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	& > *:not(:last-child) {
		margin-bottom: 15px;
	}
`

const NounLink = ({ noun }: { noun: Noun }) => {
	return (
		<Tooltip
			renderTarget={ref => (
				<li ref={ref}>
					<PlainLink to={`/campaigns/${noun.campaign_id}/nouns/${noun.id}`}>
						- {noun.name}
					</PlainLink>
				</li>
			)}
			tooltipContent={<StyledMarkdown>{noun.summary}</StyledMarkdown>}
		/>
	)
}

const filterByType = (nouns: Array<Noun>, type: NounType) =>
	sortBy(nouns.filter(n => n.noun_type === type), 'name')

type Props = {
	nouns?: Array<Noun>
}
function RelatedNouns({ nouns }: Props) {
	if (!nouns) return null
	const people = filterByType(nouns, 'PERSON')
	const places = filterByType(nouns, 'PLACE')
	const things = filterByType(nouns, 'THING')
	const factions = filterByType(nouns, 'FACTION')

	return (
		<Root>
			{people.length ? (
				<NounGroup>
					<H2>People</H2>
					<Spacer height={15} />
					<NounList>
						{people.map(noun => (
							<NounLink key={noun.id} noun={noun} />
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
							<NounLink key={noun.id} noun={noun} />
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
							<NounLink key={noun.id} noun={noun} />
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
							<NounLink key={noun.id} noun={noun} />
						))}
					</NounList>
				</NounGroup>
			) : null}
		</Root>
	)
}

export default RelatedNouns
