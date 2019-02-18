// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'

import { H2 } from './heading'
import Spacer from './spacer'
import { List } from './lists'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

type Props = {
	title: string,
	controls: React.Node,
	children: React.Node,
}
export default function AddableList({ title, controls, children }: Props) {
	return (
		<div>
			<Header>
				<H2>{title}</H2>
				{controls}
			</Header>
			<Spacer height={10} />
			<List>{children}</List>
		</div>
	)
}
