// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { fromTheme } from 'r/theme'
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
