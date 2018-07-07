// @flow
import * as React from 'react'

import type { Campaign } from 'r/data/campaigns'
import ListCard from 'r/components/list-card'

type Props = {
  campaign: Campaign,
}
export default function CampaignCard({ campaign }: Props) {
  return (
    <ListCard
      to={`/campaigns/${campaign.id}`}
      title={campaign.name}
      description={campaign.description}
    />
  )
}
