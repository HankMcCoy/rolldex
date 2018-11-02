// @flow
import * as React from 'react'
import { useState, useRef, useLayoutEffect } from 'r/util/react-hooks'

function getSize(el, attr) {
	return parseFloat(window.getComputedStyle(el).getPropertyValue(attr))
}
function getNumAutoRows(el: HTMLElement, minRows: number) {
	const savedRows = el.getAttribute('rows')
	el.setAttribute('rows', minRows.toString())

	const { scrollHeight } = el
	const lineHeight = getSize(el, 'line-height')
	const paddingTop = getSize(el, 'padding-top')
	const paddingBottom = getSize(el, 'padding-bottom')

	console.log({ scrollHeight, lineHeight, paddingTop, paddingBottom })

	el.setAttribute('rows', savedRows || '')
	return Math.ceil((scrollHeight - paddingTop - paddingBottom) / lineHeight)
}

type Props = {
	minRows: number | void,
	className: string,
}
export default function ResizableTextarea({
	minRows = 4,
	className,
	...rest
}: Props) {
	const [numRows, setNumRows] = useState<?number>()
	const rootElRef = useRef()
	useLayoutEffect(() => {
		const rootEl = rootElRef.current
		const autoRows = getNumAutoRows(rootEl, minRows)
		if (autoRows !== numRows) {
			setNumRows(Math.max(autoRows, minRows))
		}
	})
	return (
		<textarea
			css={`
				resize: none;
			`}
			ref={rootElRef}
			rows={numRows}
			{...rest}
		/>
	)
}
