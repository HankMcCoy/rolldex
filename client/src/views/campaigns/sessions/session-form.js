// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Formik } from 'formik'

import { fromTheme } from 'r/theme'
import { required } from 'r/util/formik'
import FormField from 'r/components/form-field'
import { PrimaryButton, SecondaryButton } from 'r/components/button'
import Spacer from 'r/components/spacer'

const FormWrapper = styled.div`
  max-width: ${fromTheme('largeFormWidth')}px;
  & input {
    width: 100%;
  }
  & textarea {
    min-width: 100%;
    max-width: 100%;
  }
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

type Values = {|
  name: string,
  summary: string,
  notes: string
|}
type Props = {
  initialValues: Values,
  onSubmit: (Values, *) => void,
  onCancel: () => void
}
export default function SessionForm({
  initialValues,
  onSubmit,
  onCancel
}: Props) {
  return (
    <FormWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormField name="name" label="Name" validate={required} />
            <Spacer height={20} />
            <FormField
              name="summary"
              label="Summary"
              component="textarea"
              rows={3}
              validate={required}
            />
            <Spacer height={20} />
            <FormField
              name="notes"
              label="Notes"
              component="textarea"
              rows={15}
              validate={required}
            />
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
