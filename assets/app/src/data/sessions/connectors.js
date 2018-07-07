// @flow
import flowRight from 'lodash-es/flowRight'
import omit from 'lodash-es/omit'
import { type HOC, lifecycle, mapProps } from 'recompose'

import { connect } from 'r/util/redux'
import type { Session } from 'r/data/sessions'
import { selectSession, selectSessionList } from 'r/data/sessions/selectors'
import { fetchSession, fetchSessionList } from 'r/data/sessions/action-creators'

export const withSession: <T>(
  (T) => number,
) => HOC<T, { session: Session }> = getId =>
  flowRight(
    connect({
      actionCreators: {
        fetchSession,
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.fetchSession(getId(this.props))
      },
    }),
    mapProps(props => omit(props, ['fetchSession', 'sessionId'])),
    connect({
      selectors: {
        session: selectSession(getId),
      },
    }),
  )

export const withSessionList: <T>(
  (T) => number,
) => HOC<T, { sessions: Array<Session> | void }> = getCampaignId =>
  flowRight(
    connect({
      actionCreators: {
        fetchSessionList,
      },
    }),
    lifecycle({
      componentDidMount() {
        this.props.fetchSessionList(getCampaignId(this.props))
      },
    }),
    mapProps(props => omit(props, 'fetchSessionList')),
    connect({
      selectors: {
        sessions: selectSessionList(getCampaignId),
      },
    }),
  )
