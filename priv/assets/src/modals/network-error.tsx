import * as React from 'react'
import styled from '@emotion/styled/macro'

import { PrimaryButton } from 'r/components/button'
import { H1 } from 'r/components/heading'

const Modal = styled.div`
	position: fixed;
	top: 20vh;
	width: 500px;
	left: calc(50% - 250px);
	background: #fff;
`

const Header = styled.div`
	padding: 20px;
`
const Body = styled.div`
	padding: 10px 20px;
`
const ButtonSection = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 20px;
`

export default function JumpTo({ close }: { close: () => void }) {
	return (
		<Modal>
			<Header>
				<H1>Network Error</H1>
			</Header>
			<Body>Looks like something went wrong on the server</Body>
			<ButtonSection>
				<PrimaryButton onClick={close}>Ok</PrimaryButton>
			</ButtonSection>
		</Modal>
	)
}
