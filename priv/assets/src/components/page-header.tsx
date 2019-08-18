// @flow

import * as React from 'react'
import { useRef } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'
import { type Match, withRouter, Link } from 'react-router-dom'

import { H1 } from 'r/components/heading'
import { Spacer } from 'r/components/spacer'
import { Button, LinkButton } from 'r/components/button'
import theme, { fromTheme } from 'r/theme'
import ArrowSvg from 'r/svg/arrow'
import { getSubAppColor, intersperse } from 'r/util'
import { useKeydown } from 'r/util/hooks'
import { useHistory, useTitle } from 'r/util/router'

const Root = styled('div')`
	background: ${getSubAppColor};
	flex: 0 0 auto;
	padding-left: ${fromTheme('pageHzPadding')};
	padding-right: ${fromTheme('pageHzPadding')};
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Left = styled('div')`
	flex: 0 1 auto;
	min-width: 0;
`

const Right = styled('div')`
	flex: 0 0 auto;
`

const Heading = styled(H1)`
	line-height: 1;
	padding-right: 10px;
	color: ${fromTheme('white')};
`

const Breadcrumb = styled(Link)`
	height: 40px;
	line-height: 40px;
	text-decoration: none;
	color: ${fromTheme('white')};
`

const Separator = () => (
	<div
		css={css`
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
			width: 15px;
			stroke: ${theme.white};
			position: relative;
			top: 1px;
			& > svg {
				width: 50%;
			}
		`}
	>
		<ArrowSvg />
	</div>
)

export const HeaderButton = styled(Button)`
	width: auto;
	height: 45px;
	padding: 0 15px;
	border: 1px solid ${fromTheme('white')};
	color: ${fromTheme('white')};
	&:hover {
		background: rgba(255, 255, 255, 0.2);
	}
`

export const SecondaryHeaderButton = styled(HeaderButton)`
	border: none;
`

export const HeaderLinkButton = HeaderButton.withComponent(LinkButton)
export const SecondaryHeaderLinkButton = SecondaryHeaderButton.withComponent(
	LinkButton
)

export const ControlsWrapper = styled.div`
	display: flex;
	& > *:not(:first-child) {
		margin-left: 10px;
	}
`

function useEditShortcuts(controls, controlsRef) {
	const getChild = (selector: string): HTMLElement | null =>
		controlsRef.current && controlsRef.current.querySelector(selector)
	useKeydown(
		document,
		(event: KeyboardEvent) => {
			if (controlsRef.current === null) {
				return
			}
			const ctrlPressed = (event.metaKey || event.ctrlKey) && !event.shiftKey
			const { key } = event
			if (key === 'e' && ctrlPressed) {
				event.preventDefault()
				const editBtn = getChild('[data-id="edit"]')
				const cancelBtn = getChild('[data-id="cancel"]')
				if (editBtn) {
					editBtn.click()
				} else if (cancelBtn) {
					cancelBtn.click()
				}
			}
			if (key === 's' && ctrlPressed) {
				event.preventDefault()
				const saveBtn = getChild('[data-id="save"]')
				if (saveBtn) {
					saveBtn.click()
				}
			}
		},
		[controls]
	)
}

function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Array<BreadcrumbDesc> }) {
	return (
		<div
			css={css`
				display: flex;
			`}
		>
			{intersperse(
				breadcrumbs.map(({ text, to }, i) => (
					<Breadcrumb key={i} to={to}>
						{text}
					</Breadcrumb>
				)),
				i => (
					<Separator key={`sep-${i}`} />
				)
			)}
		</div>
	)
}

type BreadcrumbDesc = {
	text: string,
	to: string,
}
type ExternalProps = {|
	title: string,
	breadcrumbs?: Array<BreadcrumbDesc>,
	controls?: React.Node,
|}
type RouterProps = {
	match: Match,
}
function PageHeader({
	title,
	match,
	breadcrumbs,
	controls,
}: ExternalProps & RouterProps) {
	const controlsRef = useRef()
	useEditShortcuts(controls, controlsRef)
	useTitle(title)
	return (
		<Root match={match}>
			<Left>
				{breadcrumbs ? (
					<>
						<Spacer height={10} />
						<Breadcrumbs breadcrumbs={breadcrumbs} />
						<Heading>{title}</Heading>
						<Spacer height={14} />
					</>
				) : (
					<>
						<Spacer height={32} />
						<Heading>{title}</Heading>
						<Spacer height={32} />
					</>
				)}
			</Left>
			<Right ref={controlsRef}>{controls}</Right>
		</Root>
	)
}

const PageHeaderExport: React$ComponentType<ExternalProps> = withRouter(
	PageHeader
)
export default PageHeaderExport

export const SaveControls = ({
	onSubmit,
	onCancel,
}: {
	onSubmit: () => void,
	onCancel?: () => void,
}) => {
	const history = useHistory()
	return (
		<ControlsWrapper>
			<SecondaryHeaderButton
				data-id="cancel"
				onClick={onCancel || (() => history.goBack())}
				title="Cancel (Ctrl/Cmd-E)"
			>
				Cancel
			</SecondaryHeaderButton>
			<HeaderButton
				type="submit"
				data-id="save"
				onClick={() => onSubmit()}
				title="Save (Ctrl/Cmd-S)"
			>
				Save
			</HeaderButton>
		</ControlsWrapper>
	)
}
