import withBorderProps from './withBorderProps'
import withModifiersProps from './withModifiersProps'
import withPositionProps from './withPositionProps'
import withSpaceProps from './withSpaceProps'

type CalcSpaceHorizontal = {
  marginHorizontal?: number
  marginLeft?: number
  marginRight?: number
  paddingHorizontal?: number
  paddingLeft?: number
  paddingRight?: number
}

export const calcSpaceHorizontal = ({
  marginHorizontal,
  marginLeft,
  marginRight,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
}: CalcSpaceHorizontal): number => {
  let total = 0

  if (marginHorizontal) {
    total += marginHorizontal * 2
  }

  if (marginLeft) {
    total += marginLeft
  }

  if (marginRight) {
    total += marginRight
  }

  if (paddingHorizontal) {
    total += paddingHorizontal * 2
  }

  if (paddingLeft) {
    total += paddingLeft
  }

  if (paddingRight) {
    total += paddingRight
  }

  return total
}

export {
  withBorderProps,
  withModifiersProps,
  withPositionProps,
  withSpaceProps,
}
