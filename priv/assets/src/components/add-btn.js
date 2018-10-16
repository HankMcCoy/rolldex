// @flow
import * as React from 'react'
import styled from 'react-emotion'
import isPropValid from '@emotion/is-prop-valid'
import { type Match, Link, withRouter } from 'react-router-dom'

import { getSubAppColor } from 'r/util'

const commonStyles = {
  textDecoration: 'none',
  height: '34px',
  width: '34px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  borderRadius: '3px',
}
const commonDynamicStyles = ({ invertedFoo, match, theme }) => ({
  background: invertedFoo ? theme.white : getSubAppColor({ match, theme }),
  color: invertedFoo ? getSubAppColor({ match, theme }) : theme.white,
})
const StyledButton = styled('button')(commonStyles, commonDynamicStyles)

const StyledLink = styled(Link, { shouldForwardProp: isPropValid })(
  commonStyles,
  commonDynamicStyles,
  {
    textDecoration: 'none',
  }
)

type Props = {
  inverted?: boolean,
  onClick?: (SyntheticMouseEvent<HTMLButtonElement>) => void,
  to?: string,
  match: Match,
}
function AddBtn({ inverted = false, onClick, to, match }: Props) {
  if (onClick) {
    return (
      <StyledButton onClick={onClick} invertedFoo={inverted} match={match}>
        +
      </StyledButton>
    )
  }
  if (to) {
    return (
      <StyledLink to={to} invertedFoo={inverted} match={match}>
        +
      </StyledLink>
    )
  }
  throw new Error(
    'AddBtn requires either `onClick` or `to` to be provided as props'
  )
}

export default withRouter(AddBtn)
