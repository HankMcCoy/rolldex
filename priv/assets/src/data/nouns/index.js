// @flow
import keyBy from 'lodash-es/keyBy'
import omit from 'lodash-es/omit'

import { success, createReducer } from 'r/util/redux'

import {
	CREATE_NOUN,
	UPDATE_NOUN,
	FETCH_NOUN_LIST,
	FETCH_NOUN,
	REMOVE_NOUN,
} from './action-types'

export type NounType = 'PERSON' | 'PLACE' | 'THING' | 'FACTION'
export type Noun = {|
	id: number,
	name: string,
	campaign_id: number,
	noun_type: NounType,
	summary: string,
	notes: string,
	private_notes: string,
	inserted_at: string,
	updated_at: string,
|}

export type DraftNoun = $Diff<
	Noun,
	{| id: number, inserted_at: string, updated_at: string |}
>

export type State = {
	[number]: Noun,
}
const initialState: State = {}
const updateOne = (state, noun: Noun) => ({
	...state,
	[noun.id]: noun,
})
export default createReducer(initialState, {
	[success(FETCH_NOUN_LIST)]: (state, nouns: Array<Noun>) => ({
		...state,
		...keyBy(nouns, 'id'),
	}),
	[success(FETCH_NOUN)]: updateOne,
	[success(CREATE_NOUN)]: updateOne,
	[success(UPDATE_NOUN)]: updateOne,
	[REMOVE_NOUN]: (state: State, nounId: number) =>
		omit(state, nounId.toString()),
})
