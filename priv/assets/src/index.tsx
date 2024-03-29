import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { registerBeforeUnload } from './util/hooks'

const origConsoleError = console.error
console.error = (msg: string) => {
	if (
		msg ===
		'The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".'
	) {
		return
	}
	origConsoleError(msg)
}

const rootEl = document.getElementById('root')
if (rootEl) {
	registerBeforeUnload()
	ReactDOM.render(<App />, rootEl)
} else {
	throw new Error('Oops! No #root element found to render the app into.')
}
