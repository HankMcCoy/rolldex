// @flow
import * as React from 'react'
import theme from 'r/theme'
import { Link } from 'react-router-dom'

import { callApi } from 'r/util/api'
import { useState, useEffect, useRef } from 'r/util/react-hooks'
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

export default function JumpTo({ close }: { close: () => void }) {
	const [searchMatches, setSearchMatches] = useState<Array<SearchMatch>>([])
	const [value, setValue] = useState('')
	const [selectedMatchIdx, setSelectedMatchIdx] = useState(0)
	const location = useLocation()
	const rootElRef = useRef()

	const handleKeydown = (e: KeyboardEvent) => {
		const rootEl = rootElRef.current

		if (e.key === 'ArrowDown') {
			setSelectedMatchIdx(idx => wrapSelection(idx + 1, searchMatches.length))
		}
		if (e.key === 'ArrowUp') {
			setSelectedMatchIdx(idx => wrapSelection(idx - 1, searchMatches.length))
		}
		if (e.key === 'Enter') {
			if (searchMatches.length && rootEl && rootEl instanceof Element) {
				const linkEls = [...rootEl.querySelectorAll('a')]
				const linkEl = linkEls[selectedMatchIdx]
				if (e.ctrlKey || e.metaKey) {
					window.open(linkEl.getAttribute('href'), '_blank')
				} else {
					linkEl.click()
				}
				close()
			}
		}
	}

	const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget
		setValue(value)
		const idMatch = new RegExp('/campaigns/([0-9]+)(?:/|$)').exec(
			location.pathname
		)
		if (idMatch) {
			const campaign_id = parseInt(idMatch[1], 10)

			getQuickSearchMatches(value, campaign_id).then(searchMatches => {
				setSearchMatches(searchMatches)
			})
		}
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
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	})

	return (
		<div
			css={`
				position: absolute;
				top: 20vh;
				left: calc(50% - ${w / 2}px);
			`}
			ref={rootElRef}
		>
			<input
				css={`
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
							css={`
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
			</div>
		</div>
	)
}
