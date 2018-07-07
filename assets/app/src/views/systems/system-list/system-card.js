// @flow
import * as React from 'react'

import type { System } from 'r/data/systems'
import ListCard from 'r/components/list-card'

//
type Props = {
  system: System,
}
export default function SystemCard({ system }: Props) {
  return (
    <ListCard
      to={`/systems/${system.id}`}
      title={system.name}
      description={system.description}
    />
  )
}
