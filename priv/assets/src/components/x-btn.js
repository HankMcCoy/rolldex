import * as React from 'react'
import styled from 'react-emotion'
import XSvg from 'r/svg/x'

const XBtnRoot = styled.button`
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & svg {
    stroke: #ccc;
    width: 20px;
    height: 20px;
  }
  &:hover svg {
    stroke: #888;
  }
  &:focus {
    outline: 1px solid rgba(0, 0, 0, 0.1);
  }
`

export default props => {
  return (
    <XBtnRoot {...props}>
      <XSvg />
    </XBtnRoot>
  )
}
