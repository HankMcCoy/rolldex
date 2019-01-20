// @flow
import * as React from 'react'
import styled from '@emotion/styled/macro'

import H2 from './h2'
import Spacer from './spacer'
import AddBtn from './add-btn'
import { List } from './lists'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

type Props = {
	title: string,
	addPath: string,
	canEdit: boolean,
	children: React.Node,
}
export default function AddableList({
	title,
	addPath,
	canEdit,
	children,
}: Props) {
	return (
		<div>
			<Header>
				<H2>{title}</H2>
				{canEdit ? <AddBtn to={addPath} /> : null}
			</Header>
			<Spacer height={10} />
			<List>{children}</List>
		</div>
	)
}
