import * as React from 'react'
import H3 from 'r/components/h3'
import Spacer from 'r/components/spacer'

type Props = {
  title: string,
  summary?: string,
}

export default function TitleNSummary({ title, summary }: Props) {
  return summary ? (
    <React.Fragment>
      <H3>{title}</H3>
      <Spacer height={10} />
      {summary}
    </React.Fragment>
  ) : (
    <H3>{title}</H3>
  )
}
