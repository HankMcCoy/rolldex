import * as React from 'react'
import styled from 'styled-components'

import theme from 'r/theme'
import { H2 } from 'r/components/heading'
import { Spacer } from 'r/components/spacer'

const Modal = styled.div`
	position: absolute;
	top: 20vh;
	margin: 0 auto;
	border: 1px solid ${theme.gray87};
	border-radius: 2px;
	background: ${theme.white};
	padding: 30px 40px;
`
const ShortcutList = styled.ul`
	padding-left: 20px;
	margin: 0;
`
const Pre = styled.pre`
	display: inline;
`

export default function HelpModal() {
	const Meta = navigator.platform === 'MacIntel' ? 'Cmd' : 'Ctrl'
	return (
		<Modal>
			<H2>Keyboard Shortcuts</H2>
			<Spacer height={20} />
			<ShortcutList>
				<li>
					<Pre>{Meta}+K</Pre>: Jump To
				</li>
				<li>
					<Pre>{Meta}+E</Pre>: Edit/Cancel Editing
				</li>
				<li>
					<Pre>{Meta}+S</Pre>: Save
				</li>
				<li>
					<Pre>{Meta}+/</Pre>: Show help
				</li>
				<li>
					<Pre>Esc</Pre>: Close active modal
				</li>
			</ShortcutList>
		</Modal>
	)
}
