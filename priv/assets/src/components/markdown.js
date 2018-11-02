// @flow
import * as React from 'react'
import styled from 'react-emotion'
import Remarkable from 'react-remarkable'

import theme from 'r/theme'

const MarkdownContainer = styled.div`
	& > span > * {
		margin: 10px 0;
	}
	& > span > *:first-child {
		margin-top: 0;
	}
	& > span > *:last-child {
		margin-bottom: 0;
	}
	& h1,
	& h2,
	& h3 {
		font-family: Roboto Slab;
	}
	& h1 {
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 10px;
	}
	& h1:not(:first-child) {
		margin-top: 20px;
	}
	& h2 {
		font-size: 18px;
		font-weight: 400;
	}
	& h2:not(:first-child) {
		margin-top: 20px;
	}
	& h3 {
		font-size: 16px;
		font-weight: 400;
	}
	& ul {
		padding-left: 20px;
	}
	& ul li {
		list-style-type: disc;
	}
	& ul li ul li {
		list-style-type: circle;
	}
	& ul li ul li ul li {
		list-style-type: square;
	}
	& th {
		font-weight: 400;
	}
	& th,
	& td {
		padding: 5px;
		border: 1px solid ${theme.gray30};
	}
`

export default function Markdown({ children }: { children: React.Node }) {
	return (
		<Remarkable
			container={MarkdownContainer}
			options={{ html: true, breaks: true, linkify: true }}
		>
			{children}
		</Remarkable>
	)
}
