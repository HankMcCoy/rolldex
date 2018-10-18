// @flow
import * as React from 'react'
import { type Action } from 'r/util/redux'

import { SHOW_MODAL, HIDE_MODAL } from './action-types'
import { type ModalDesc } from './reducer'

let modalIdx = 0
export const showModal = (modal: React.Element<any>): Action<ModalDesc> => ({
	type: SHOW_MODAL,
	payload: {
		id: modalIdx++,
		modal,
	},
})

export const hideModal = (): Action<void> => ({
	type: HIDE_MODAL,
})
