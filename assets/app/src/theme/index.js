// @flow
import get from 'lodash-es/get'

const gray20 = '#333333'
const gray30 = '#484D4B'
const gray38 = '#5A605E'
const white = '#fff'

const campaignPurple = '#6C6EA0'
const systemBlue = '#417F9C'

export const fromTheme = (path: string) => ({ theme }: { theme: Object }) =>
  get(theme, path)

const theme = {
  // COLORS
  gray20,
  gray30,
  gray38,
  white,
  campaignPurple,
  systemBlue,
  textColor: gray20,

  // SIZES
  topBarHeight: '80px',
  sidebarHzPadding: '20px',
  pageHzPadding: '30px',

  // FONTS
  contentFont: {
    family: 'Roboto',
    weights: {
      veryLight: 300,
      light: 400,
      medium: 500,
      heavy: 700,
    },
  },
  titleFont: {
    family: 'Roboto Slab',
    weights: {
      veryLight: 300,
      light: 400,
    },
  },
}
export default theme
