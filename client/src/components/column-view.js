// @flow
import * as React from 'react'
import styled from 'react-emotion'

export const Column = styled('div')`
  flex: 1 0 0%;
  min-width: 0;
`

const ColumnWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  ${Column}:not(:last-child) {
    margin-right: ${props => props.gutterWidth}px;
  }
`

type ColumnEl = React.Element<typeof Column>

type Props = {
  children: React.ChildrenArray<ColumnEl>,
  gutterWidth?: number,
}
export default function ColumnView({ children, gutterWidth = 10 }: Props) {
  return <ColumnWrapper gutterWidth={gutterWidth}>{children}</ColumnWrapper>
}
