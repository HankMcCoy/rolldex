// @flow
import * as React from 'react'
import styled from 'react-emotion'

import H2 from './h2'
import Spacer from './spacer'
import AddBtn from './add-btn'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

const List = styled.div`
	& > *:not(:last-child) {
		margin-bottom: 10px;
	}
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
