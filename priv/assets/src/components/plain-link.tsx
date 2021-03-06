import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

interface Props {
	display?: string
}
export default styled(Link)<Props>`
	text-decoration: none;
	color: unset;
	display: ${({ display }) => (display ? display : 'inline')};
`
