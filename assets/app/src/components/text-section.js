// @flow
import * as React from 'react'

import Spacer from './spacer'
import H2 from './h2'

type Props = {
  title: string,
  children: React.Node,
}
export default function TextSection({ title, children }: Props) {
  return (
    <div>
      <H2>{title}</H2>
      <Spacer height={15} />
      <p>{children}</p>
    </div>
  )
}
