// @flow
import get from 'lodash-es/get'

const gray20 = '#333333'
const gray30 = '#484D4B'
const gray38 = '#5A605E'
const gray50 = '#888'
const gray87 = '#ddd'
const gray97 = '#F8F8F8'
const white = '#fff'

const campaignColor = '#6C6EA0'
const campaignText = '#696987'
const campaignColorLight = '#E4E4ED'
const systemColor = '#417F9C'
const primaryGreen = '#3BA170'
const primaryGreenLight = '#44BA81'
const dangerRed = '#b81422'

export const fromTheme = (path: string) => ({ theme }: { theme: Object }) =>
	get(theme, path)

const theme = {
	// COLORS
	gray20,
	gray30,
	gray38,
	gray50,
	gray87,
	gray97,
	white,
	campaignColor,
	campaignText,
	campaignColorLight,
	systemColor,
	primaryGreen,
	primaryGreenLight,
	dangerRed,
	textColor: gray20,

	// SIZES
	topBarHeight: '100px',
	sidebarHzPadding: 20,
	pageHzPadding: '30px',
	pageSidebarWidth: 300,
	largeFormWidth: 580,

	// FONTS
	baseFontSize: 18,
	baseLineHeight: 24,
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

	breakpoints: {
		tablet: 1100,
		phone: 800,
	},
}
export default theme
