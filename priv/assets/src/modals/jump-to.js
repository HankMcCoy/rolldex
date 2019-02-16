// @flow
import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/core'
import theme from 'r/theme'
import { Link } from 'react-router-dom'

import { callApi } from 'r/util/api'
import { useLocation } from 'r/util/router'
import { type NounType } from 'r/domains/nouns'

const w = 580
const h = 75

type SearchMatch = {|
	name: string,
	id: number,
	campaign_id: number,
	source: NounType | 'SESSION',
|}

const getPath = (searchMatch: SearchMatch): string => {
	switch (searchMatch.source) {
		case 'PERSON':
		case 'FACTION':
		case 'PLACE':
		case 'THING':
			return `/campaigns/${searchMatch.campaign_id}/nouns/${searchMatch.id}`
		case 'SESSION':
			return `/campaigns/${searchMatch.campaign_id}/sessions/${searchMatch.id}`
		default:
			throw new Error('Unrecognized match type')
	}
}

const getQuickSearchMatches = (
	q: string,
	campaign_id: number
): Promise<Array<SearchMatch>> => {
	return callApi({
		method: 'GET',
		path: `/api/campaigns/${campaign_id}/quick-find?q=${q}`,
	}).then(({ data }) => data)
}

const wrapSelection = (idx, count) => {
	if (count === 0) return 0
	if (idx === -1) return count - 1
	if (idx === count) return 0
	return idx
}

const campaignIdRegExp = new RegExp('/campaigns/([0-9]+)(?:/|$)')
const getCampaignId = (location: { pathname: string }): number => {
	let campaignId: ?number = undefined
	const idMatch = campaignIdRegExp.exec(location.pathname)
	if (idMatch) {
		campaignId = parseInt(idMatch[1], 10)
	}

	if (!campaignId) {
		throw new Error(`Could not find campaignId in URL, ${location.pathname}`)
	}
	return campaignId
}

export default function JumpTo({ close }: { close: () => void }) {
	const [searchMatches, setSearchMatches] = useState<Array<SearchMatch>>([])
	const [value, setValue] = useState('')
	const [selectedMatchIdx, setSelectedMatchIdx] = useState(0)
	const location = useLocation()
	const rootElRef = useRef()
	const campaignId = getCampaignId(location)

	const handleKeydown = (e: KeyboardEvent) => {
		const rootEl = rootElRef.current
		const numResults = searchMatches.length + (value ? 1 : 0)

		if (e.key === 'ArrowDown') {
			setSelectedMatchIdx(idx => wrapSelection(idx + 1, numResults))
			e.preventDefault()
		}
		if (e.key === 'ArrowUp') {
			setSelectedMatchIdx(idx => wrapSelection(idx - 1, numResults))
			e.preventDefault()
		}
		if (e.key === 'Enter') {
			if (rootEl && rootEl instanceof Element) {
				const linkEls = [...rootEl.querySelectorAll('a')]
				const linkEl = linkEls[selectedMatchIdx]
				if (linkEl) {
					if (e.ctrlKey || e.metaKey) {
						window.open(linkEl.getAttribute('href'), '_blank')
					} else {
						linkEl.click()
					}
					// Prevent default, to avoid it triggering form submissions
					e.preventDefault()
				}
				close()
			}
		}
	}

	const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setValue(value)

		getQuickSearchMatches(value, campaignId).then(searchMatches => {
			setSearchMatches(searchMatches)
		})
	}

	useEffect(() => {
		const rootEl = rootElRef.current
		if (rootEl) {
			const inputEl = rootEl.querySelector('input')
			if (inputEl) {
				inputEl.focus()
			}
		}
		document.addEventListener('keydown', handleKeydown)
		return () => document.removeEventListener('keydown', handleKeydown)
	})
	const hasSelectedAddItem = selectedMatchIdx === searchMatches.length

	return (
		<div
			css={css`
				position: absolute;
				top: 20vh;
			`}
			ref={rootElRef}
		>
			<input
				css={css`
					font: unset;
					width: ${w}px;
					height: ${h}px;
					padding: 20px 32px;
					border: 1px solid ${theme.gray87};
					border-radius: 2px;
					&:focus {
						outline: none;
					}
				`}
				placeholder="Jump to..."
				onChange={handleChange}
				value={value}
			/>
			<div>
				{searchMatches.map((m, i) => {
					const isSelected = selectedMatchIdx === i
					return (
						<Link
							key={i}
							css={css`
								padding: 10px 32px;
								background: ${isSelected ? theme.campaignColor : theme.white};
								color: ${isSelected ? theme.white : theme.textColor};
								text-decoration: none;
								display: block;
							`}
							to={getPath(m)}
							onClick={() => {
								close()
							}}
						>
							{m.name}
						</Link>
					)
				})}
				{value && (
					<Link
						css={css`
							padding: 10px 32px;
							background: ${hasSelectedAddItem
								? theme.campaignColor
								: theme.white};
							color: ${hasSelectedAddItem ? theme.white : theme.textColor};
							text-decoration: none;
							display: block;
						`}
						to={`/campaigns/${campaignId}/nouns/add?name=${value}`}
						onClick={() => {
							close()
						}}
					>
						Add '{value}'
					</Link>
				)}
			</div>
		</div>
	)
}
