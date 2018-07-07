// @flow
import keyBy from 'lodash-es/keyBy'

import { success, createReducer } from 'r/util/redux'

import { CREATE_NOUN, FETCH_NOUN_LIST, FETCH_NOUN } from './action-types'

export type NounType = 'PERSON' | 'PLACE' | 'THING'
export type Noun = {|
  id: number,
  name: string,
  campaign_id: number,
  noun_type: NounType,
  description: string,
  inserted_at: string,
  updated_at: string,
|}

export type DraftNoun = $Diff<
  Noun,
  {| id: number, inserted_at: string, updated_at: string |},
>

export type State = {
  [number]: Noun,
}
const initialState: State = {}
export default createReducer(initialState, {
  [success(FETCH_NOUN_LIST)]: (state, nouns: Array<Noun>) => ({
    ...state,
    ...keyBy(nouns, 'id'),
  }),
  [success(FETCH_NOUN)]: (state, noun: Noun) => ({
    ...state,
    [noun.id]: noun,
  }),
  [success(CREATE_NOUN)]: (state, noun: Noun) => ({
    ...state,
    [noun.id]: noun,
  }),
})
