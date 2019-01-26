// @flow
import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled/macro'

const Modal = styled.div`
	position: fixed;
	top: 20vh;
	width: 400px;
	margin: 0 auto;
	background: #fff;
`

export default function JumpTo({ close }: { close: () => void }) {
	return <Modal>Error</Modal>
}
