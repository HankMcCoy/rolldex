// @flow
import * as React from 'react'
import Markdown from 'react-remarkable'
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'
import Spacer from './spacer'
import H2 from './h2'

const MarkdownContainer = styled.div`
  & h1,
  & h2,
  & h3 {
    font-family: Roboto Slab;
  }
  & h1 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  & h1:not(:first-child) {
    margin-top: 20px;
  }
  & h2 {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 5px;
  }
  & h2:not(:first-child) {
    margin-top: 10px;
  }
  & h3 {
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 5px;
  }
  & h3:not(:first-child) {
    margin-top: 5px;
  }
  & p {
    margin: 5px;
  }
  & ul {
    padding-left: 20px;
  }
  & li {
    list-style-type: disc;
  }
  & th {
    font-weight: 400;
  }
  & th,
  & td {
    padding: 5px;
    border: 1px solid ${fromTheme('gray30')};
  }
`

type Props = {
  title: string,
  children: React.Node,
  pre?: boolean
}
export default function TextSection({
  title,
  children,
  markdown = false
}: Props) {
  return (
    <div>
      <H2>{title}</H2>
      <Spacer height={15} />
      {markdown ? (
        <MarkdownContainer>
          <Markdown>{children}</Markdown>
        </MarkdownContainer>
      ) : (
        <p>{children}</p>
      )}
    </div>
  )
}
