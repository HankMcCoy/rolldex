// @flow
import * as React from 'react'
import styled from 'react-emotion'

import H2 from './h2'
import Spacer from './spacer'
import AddBtn from './add-btn'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

type Props = {
  title: string,
  addPath: string,
  children: React.Node,
}
export default function AddableList({ title, addPath, children }: Props) {
  return (
    <div>
      <Header>
        <H2>{title}</H2>
        <AddBtn to={addPath} />
      </Header>
      <Spacer height={10} />
      <div>{children}</div>
    </div>
  )
}
