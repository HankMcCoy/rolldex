// @flow
import styled from 'react-emotion'

import { fromTheme } from 'r/theme'

const ListCard = styled.div`
  background: ${fromTheme('gray97')};
  border: 1px solid ${fromTheme('gray87')};
  color: ${fromTheme('textColor')};
  display: block;
  padding: 10px;
  text-decoration: none;
`

export default ListCard
