export const themeSpacing = {
  base: 16,
  large: 24,
  none: 0,
  small: 8,
  xlarge: 32,
  xsmall: 4,
  xxlarge: 48,
  xxsmall: 2,
} as const

const themeFontSize = {
  base: 16,
  body: 14,
  caption: 12,
  level1: 48,
  level2: 38,
  level3: 28,
  none: 0,
  subtitle: 20,
  title: 24,
} as const

const themeFontWeight = {
  bold: '700',
  medium: '500',
  normal: '400',
  semibold: '600',
} as const

export const themeColors = {
  background: '#FFFFFF',
  black: '#0D0B0B',
  blue: '#2D9CDB',
  blueLight: '#56CCF2',
  blueMedium: '#2F80ED',
  border: 'rgb(216, 216, 216)',
  card: 'rgb(255, 255, 255)',
  danger: '#ef233c',
  green: '#27AE60',
  greenLight: '#6FCF97',
  greenMedium: '#219653',
  grey: '#C9CED6',
  greyDark: '#828282',
  greyLight: '#F1F2F4',
  greyMedium: '#E1E4E8',
  info: '#3a86ff',
  neutral: '#f7ede2',
  notification: 'rgb(255, 59, 48)',
  orange: '#F2994A',
  primary: '#9374b7',
  red: '#EB5757',
  secondary: '#6282CD',
  text: 'rgb(28, 28, 30)',
  warning: '#fcbf49',
  white: '#FFFFFF',
  yellow: '#F2C94C',
} as const

export type ThemeSpacing = keyof typeof themeSpacing
export type ThemeFontSize = keyof typeof themeFontSize
export type ThemeFontWeight = keyof typeof themeFontWeight
export type ThemeColors = keyof typeof themeColors

export type Theme = {
  dark: boolean
  colors: Record<ThemeColors, string>
  spacing: Record<ThemeSpacing, number>
  fontSize: Record<ThemeFontSize, number>
  fontWeight: Record<ThemeFontWeight, string>
}

export const LightTheme: Theme = {
  colors: themeColors,
  dark: false,
  fontSize: themeFontSize,
  fontWeight: themeFontWeight,
  spacing: themeSpacing,
}

const darkColors: Record<ThemeColors, string> = {
  ...themeColors,
  background: '#495057',
  border: '#333333',
  card: '#1E1E1E',
  notification: '#FF3B30',
  text: '#FFFFFF',
}

export const DarkTheme: Theme = {
  colors: { ...themeColors, ...darkColors },
  dark: true,
  fontSize: themeFontSize,
  fontWeight: themeFontWeight,
  spacing: themeSpacing,
}
