import * as React from 'react'
import styled from 'styled-components'

import { H2 } from './heading'
import { Spacer } from './spacer'
import AddBtn from './add-btn'
import { List } from './lists'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
`

type Props = {
	title: string
	addPath: string
	canEdit: boolean
	children: React.ReactNode
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
