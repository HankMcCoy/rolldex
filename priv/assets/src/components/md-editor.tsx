import SimpleMdeImpl from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
import * as React from 'react'
import styled from 'styled-components/macro'

interface MdEditorRootProps {
	minHeight: number
	children: React.ReactNode
}
const MdEditorRoot = styled.div<MdEditorRootProps>`
	& .CodeMirror,
	& .CodeMirror-scroll {
		min-height: ${props => props.minHeight}px;
	}
	& .CodeMirror {
		border: 1px solid #484d4b;
		border-radius: 2px;
		padding: 10px 6px;
	}
	& .CodeMirror .CodeMirror-code .cm-header {
		font-family: Roboto Slab;
		font-weight: 400;
	}
	& .CodeMirror .CodeMirror-code .cm-header-1 {
		font-size: 20px;
	}
	& .CodeMirror .CodeMirror-code .cm-header-2 {
		font-size: 18px;
	}
	& .CodeMirror .CodeMirror-code .cm-header-3 {
		font-size: 16px;
	}
`

interface Target {
	name: string
	value: string
}
type Props = {
	name: string
	value?: string
	onChange?: ({ target: Target }) => void
	minHeight: number
}
export default class MdEditor extends React.Component<Props, void> {
	textareaRef: { current: null | HTMLTextAreaElement } = React.createRef()
	simpleMde: SimpleMdeImpl
	static defaultProps = {
		minHeight: 100,
	}
	render() {
		return (
			<MdEditorRoot minHeight={this.props.minHeight}>
				<textarea ref={this.textareaRef} />
			</MdEditorRoot>
		)
	}
	componentDidMount() {
		const { name, value, onChange } = this.props
		this.simpleMde = new SimpleMdeImpl({
			spellChecker: false,
			element: this.textareaRef.current,
			toolbar: false,
			status: false,
			shortcuts: {
				drawLink: 'Shift-Cmd-K',
			},
		})

		this.simpleMde.value(value)
		this.simpleMde.codemirror.on('change', () => {
			if (onChange) {
				onChange({ target: { name, value: this.simpleMde.value() } })
			}
		})

		this.simpleMde.codemirror.options.extraKeys['Tab'] = false
		this.simpleMde.codemirror.options.extraKeys['Shift-Tab'] = false
	}
	shouldComponentUpdate() {
		return false
	}
	componentWillUnmount() {
		this.simpleMde.toTextArea()
		this.simpleMde = null
	}
}
