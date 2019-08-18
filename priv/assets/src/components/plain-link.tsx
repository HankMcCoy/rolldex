import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default styled(Link)`
	text-decoration: none;
	color: unset;
	display: ${({ display }) => (display ? display : 'inline')};
`
