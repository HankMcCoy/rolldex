// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'
import TetherComponent from 'react-tether'

import type { Noun, NounType } from 'r/domains/nouns'

import { H2 } from 'r/components/heading'
import Spacer from 'r/components/spacer'
import { StyledMarkdown } from 'r/components/text-section'
import PlainLink from 'r/components/plain-link'
import { useFetch } from 'r/util/use-fetch'
import { useHover } from 'r/util/hooks'

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

const Tooltip = styled(StyledMarkdown)`
	background: #333;
	color: #fff;
	padding: 20px;
	border-radius: 3px;
	max-width: 400px;
`

const NounLink = ({ noun }: {| noun: Noun |}) => {
	const [hoverRef, isLinkHovered] = useHover()
	console.log({ isLinkHovered })
	return (
		<TetherComponent
			attachment="center right"
			targetAttachment="center left"
			offset="0 5px"
			renderTarget={(ref: { -current: React$ElementRef<'li'> | null }) => (
				<li
					ref={el => {
						console.log({ ref, el, hoverRef })
						if (el) {
							hoverRef.current = ref.current = el
						}
					}}
				>
					<PlainLink to={`/campaigns/${noun.campaign_id}/nouns/${noun.id}`}>
						- {noun.name}
					</PlainLink>
				</li>
			)}
			renderElement={ref =>
				isLinkHovered && <Tooltip ref={ref}>{noun.summary}</Tooltip>
			}
		/>
	)
}

const filterByType = (nouns: Array<Noun>, type: NounType) =>
	nouns.filter(n => n.noun_type === type)

type Props = {|
	path: string,
|}
function RelatedNouns({ path }: Props) {
	const [nouns] = useFetch<Array<Noun>>(path)
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
