// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Formik } from 'formik'

import { required } from 'r/util/formik'

import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'

const FormWrapper = styled('div')`
  max-width: 500px;
`

const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`

type Values = {|
  email: string,
|}
type Props = {|
  initialValues: Values,
  onSubmit: (Values, *) => void,
  onCancel: () => void,
|}
export default function MemberForm({
  initialValues,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="email" label="Email" validate={required} />
            <Spacer height={20} />
            <ButtonsWrapper>
              <SecondaryButton
                onClick={e => {
                  e.preventDefault()
                  onCancel()
                }}
              >
                Cancel
              </SecondaryButton>
              <Spacer width={10} />
              <PrimaryButton type="submit">Save</PrimaryButton>
            </ButtonsWrapper>
          </form>
        )}
      />
    </FormWrapper>
  )
}
