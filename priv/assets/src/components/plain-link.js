import { Link } from 'react-router-dom'
import styled from 'react-emotion'

export default styled(Link)`
  text-decoration: none;
  display: ${({ display }) => (display ? display : 'inline')};
`
