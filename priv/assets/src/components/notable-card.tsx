import * as React from 'react'
import styled from 'styled-components/macro'

import ListCard from './list-card'
import TitleNSummary from './title-n-summary'
import XBtn from './x-btn'

type Props = {
	title: string
	summary?: string
	onRemove?: ({ clickEvent }: { clickEvent: MouseEvent }) => void
}
export default function NotableCard({ title, summary, onRemove }: Props) {
	return (
		<ListCard paddingRight={onRemove ? 0 : undefined}>
			<div
				css={`
					display: flex;
					justify-content: space-between;
					align-items: center;
				`}
			>
				<TitleNSummary title={title} summary={summary} />
				{onRemove && (
					<XBtn
						onClick={(e: MouseEvent) => {
							onRemove({ clickEvent: e })
						}}
					/>
				)}
			</div>
		</ListCard>
	)
}
