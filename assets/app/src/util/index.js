// @flow
import flatMap from 'lodash-es/flatMap'

export function intersperse<T>(arr: Array<T>, inter: number => T): Array<T> {
  return flatMap(arr, (a, i) => (i ? [inter(i), a] : [a]))
}
