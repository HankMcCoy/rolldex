// @flow
import * as React from 'react'
import { createReducer } from 'r/util/redux'

import { SHOW_MODAL, HIDE_MODAL } from './action-types'

export type ModalDesc = {|
	id: number,
	modal: React.Element<any>,
|}

type State = Array<ModalDesc>
const initialState: State = []

export default createReducer(initialState, {
	[SHOW_MODAL]: (state, modalDesc: ModalDesc) => [...state, modalDesc],
	[HIDE_MODAL]: state => state.slice(0, -1),
})
