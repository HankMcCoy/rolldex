// @flow
import * as React from 'react'

import Markdown from './markdown'
import Spacer from './spacer'
import H2 from './h2'

type Props = {
	title: string,
	children: React.Node,
	markdown?: boolean,
}
export default function TextSection({
	title,
	children,
	markdown = false,
}: Props) {
	return (
		<div>
			<H2>{title}</H2>
			<Spacer height={15} />
			{markdown ? <Markdown>{children}</Markdown> : <p>{children}</p>}
		</div>
	)
}
