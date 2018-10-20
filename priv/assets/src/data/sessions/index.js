// @flow
import keyBy from 'lodash-es/keyBy'
import omit from 'lodash-es/omit'

import { success, createReducer } from 'r/util/redux'

import {
	CREATE_SESSION,
	UPDATE_SESSION,
	FETCH_SESSION_LIST,
	FETCH_SESSION,
	REMOVE_SESSION,
} from './action-types'

export type Session = {|
	id: number,
	name: string,
	campaign_id: number,
	summary: string,
	notes: string,
	private_notes: string,
	inserted_at: string,
	updated_at: string,
|}

export type DraftSession = $Diff<
	Session,
	{| id: number, inserted_at: string, updated_at: string |}
>

export type State = {
	[number]: Session,
}
const initialState: State = {}
const updateOne = (state, session: Session) => ({
	...state,
	[session.id]: session,
})
export default createReducer(initialState, {
	[success(FETCH_SESSION_LIST)]: (state, sessions: Array<Session>) => ({
		...state,
		...keyBy(sessions, 'id'),
	}),
	[success(FETCH_SESSION)]: updateOne,
	[success(CREATE_SESSION)]: updateOne,
	[success(UPDATE_SESSION)]: updateOne,
	[REMOVE_SESSION]: (state: State, sessionId: number) =>
		omit(state, sessionId.toString()),
})
