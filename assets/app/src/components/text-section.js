// @flow
import * as React from 'react'

import Spacer from './spacer'
import H2 from './h2'

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
      {pre ? <pre>{children}</pre> : <p>{children}</p>}
    </div>
  )
}
