// @flow
import * as React from 'react'
import styled from 'react-emotion'

import Spacer from './spacer'
import H2 from './h2'

const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`

type Props = {
  title: string,
  children: React.Node,
  pre?: boolean,
}
export default function TextSection({ title, children, pre = false }: Props) {
  return (
    <div>
      <H2>{title}</H2>
      <Spacer height={15} />
      {pre ? <Pre>{children}</Pre> : <p>{children}</p>}
    </div>
  )
}
