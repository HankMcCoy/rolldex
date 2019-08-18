import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'

export default styled(Link)`
	text-decoration: none;
	color: unset;
	display: ${({ display }) => (display ? display : 'inline')};
`