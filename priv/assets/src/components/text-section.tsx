import * as React from 'react'
import Markdown from 'react-remarkable'
import styled from 'styled-components/macro'

import theme from 'r/theme'
import { Spacer } from './spacer'
import { H2 } from './heading'
import { P } from './text'

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
	& table {
		border-collapse: collapse;
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

type StyledMarkdownProps = { className?: string; children: string }
export const StyledMarkdown = React.forwardRef(
	({ className, children }: StyledMarkdownProps, ref: any) => (
		<div className={className}>
			<Markdown
				ref={ref}
				container={MarkdownContainer}
				options={{ html: true, breaks: true, linkify: true }}
			>
				{children}
			</Markdown>
		</div>
	)
)

type Props = {
	title: string
	children: string
	markdown?: boolean
}
export default function TextSection({
	title,
	children,
	markdown = false,
}: Props) {
	return (
		<div
			css={`
				max-width: 700px;
			`}
		>
			<H2>{title}</H2>
			<Spacer height={15} />
			{markdown ? (
				<StyledMarkdown>{children}</StyledMarkdown>
			) : (
				<P>{children}</P>
			)}
		</div>
	)
}
