// @flow
import keyBy from 'lodash-es/keyBy'

import { success, createReducer } from 'r/util/redux'

import { CREATE_MEMBER, FETCH_MEMBER_LIST, REMOVE_MEMBER } from './action-types'

export type MemberType = 'READ_ONLY'
export type Member = {|
  id: number,
  inserted_at: string,
  updated_at: string,

  user_id: number,
  campaign_id: number,
  email: string,
  member_type: MemberType,
|}

export type DraftMember = $Diff<
  Member,
  {| id: number, inserted_at: string, updated_at: string, user_id: number |}
>

export type State = {
  [number]: Member,
}
const initialState: State = {}
const updateOne = (state, member: Member) => ({
  ...state,
  [member.id]: member,
})
export default createReducer(initialState, {
  [success(FETCH_MEMBER_LIST)]: (state, members: Array<Member>) => ({
    ...state,
    ...keyBy(members, 'id'),
  }),
  [success(CREATE_MEMBER)]: updateOne,
  [REMOVE_MEMBER]: (state: State, memberId: number) => ({
    ...keyBy(
      Object.keys(state)
        .filter(curId => +curId !== memberId)
        .map(id => state[+id]),
      'id'
    ),
  }),
})
