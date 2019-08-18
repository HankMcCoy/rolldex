import * as React from 'react'
import styled from 'styled-components'
import TetherComponent from 'react-tether'

import { useHoverCombo } from 'r/util/hooks'

const TooltipContent = styled.div`
	background: #333;
	color: #fff;
	padding: 20px;
	border-radius: 3px;
	max-width: 400px;
`

export const Tooltip = ({
	attachment,
	targetAttachment,
	offset,
	renderTarget,
	tooltipContent,
}: {
	attachment?: string
	targetAttachment?: string
	offset?: string
	renderTarget: (any) => React.ReactNode
	tooltipContent: React.ReactNode
}) => {
	const [targetRef, tooltipRef, showTooltip] = useHoverCombo()

	return (
		<TetherComponent
			attachment={attachment || 'middle right'}
			targetAttachment={targetAttachment || 'middle left'}
			offset={offset || '0 14px'}
			renderTarget={ref => {
				return renderTarget(el => {
					targetRef.current = ref.current = el
				})
			}}
			renderElement={ref =>
				showTooltip && (
					<TooltipContent
						ref={el => {
							tooltipRef.current = ref.current = el
						}}
					>
						{tooltipContent}
					</TooltipContent>
				)
			}
		/>
	)
}
