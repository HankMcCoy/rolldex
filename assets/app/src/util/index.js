// @flow
import flatMap from 'lodash-es/flatMap'
import { matchPath } from 'react-router-dom'

export function intersperse<T>(arr: Array<T>, inter: number => T): Array<T> {
  return flatMap(arr, (a, i) => (i ? [inter(i), a] : [a]))
}

type SubApp = 'campaigns' | 'systems'
const getSubApp = (path: string): SubApp => {
  if (matchPath(path, { path: '/campaigns' })) return 'campaigns'
  if (matchPath(path, { path: '/systems' })) return 'systems'
  throw new Error(`Unknown sub-app for path: ${path}`)
}

const subAppColors: { [SubApp]: string } = {
  campaigns: 'campaignPurple',
  systems: 'systemBlue',
}
export const getSubAppColor = ({
  match,
  theme,
}: {
  match: {
    path: string,
  },
  theme: Object,
}): string => {
  const subApp = getSubApp(match.path)
  return theme[subAppColors[subApp]]
}
