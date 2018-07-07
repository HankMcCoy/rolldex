// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Field } from 'formik'

import H2 from 'r/components/h2'
import Spacer from 'r/components/spacer'

const Root = styled('div')`
  display: flex;
  flex-direction: column;
`

type Props = {
  label: React.Node,
}
export default function FormField({ label, ...rest }: Props) {
  return (
    <Root>
      <label>
        <H2>{label}</H2>
      </label>
      <Spacer height={10} />
      <Field {...rest} />
    </Root>
  )
}
