import React from 'react'

import { pixelSizeHorizontal, pixelSizeVertical } from './normalize'
import { themeSpacing } from './theme'

import type { ThemeSpacing } from './theme'
import type { FlexStyle, ViewStyle } from 'react-native'

export type WithSpaceProps<T> = {
  m?: ThemeSpacing
  mb?: ThemeSpacing
  mh?: ThemeSpacing
  ml?: ThemeSpacing
  mr?: ThemeSpacing
  mt?: ThemeSpacing
  mv?: ThemeSpacing
  p?: ThemeSpacing
  pb?: ThemeSpacing
  ph?: ThemeSpacing
  pl?: ThemeSpacing
  pr?: ThemeSpacing
  pt?: ThemeSpacing
  pv?: ThemeSpacing
  forwardedRef?: React.ForwardedRef<T>
  style?: ViewStyle
}

function definePadding(p?: ThemeSpacing, ph?: ThemeSpacing, pv?: ThemeSpacing) {
  if (p) {
    return {
      paddingHorizontal: pixelSizeHorizontal(themeSpacing[p]),
      paddingVertical: pixelSizeVertical(themeSpacing[p]),
    }
  }

  let paddings = {}

  if (ph) {
    paddings = {
      ...paddings,
      paddingHorizontal: pixelSizeHorizontal(themeSpacing[ph]),
    }
  }

  if (pv) {
    paddings = {
      ...paddings,
      paddingVertical: pixelSizeVertical(themeSpacing[pv]),
    }
  }

  return paddings
}

function defineMargin(m?: ThemeSpacing, mh?: ThemeSpacing, mv?: ThemeSpacing) {
  if (m) {
    return {
      marginHorizontal: pixelSizeHorizontal(themeSpacing[m]),
      marginVertical: pixelSizeVertical(themeSpacing[m]),
    }
  }

  let margins = {}

  if (mh) {
    margins = {
      ...margins,
      marginHorizontal: pixelSizeHorizontal(themeSpacing[mh]),
    }
  }

  if (mv) {
    margins = {
      ...margins,
      marginVertical: pixelSizeVertical(themeSpacing[mv]),
    }
  }

  return margins
}

function setGuideStyle<T>({
  m,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
  p,
  pb,
  ph,
  pl,
  pr,
  pt,
  pv,
}: WithSpaceProps<T>): FlexStyle {
  const injectedProps: FlexStyle = {
    ...definePadding(p, ph, pv),
    paddingBottom: pixelSizeVertical(pb ? themeSpacing[pb] : 0),
    paddingLeft: pixelSizeHorizontal(pl ? themeSpacing[pl] : 0),
    paddingRight: pixelSizeHorizontal(pr ? themeSpacing[pr] : 0),
    paddingTop: pixelSizeVertical(pt ? themeSpacing[pt] : 0),
    ...defineMargin(m, mh, mv),
    marginBottom: pixelSizeVertical(mb ? themeSpacing[mb] : 0),
    marginLeft: pixelSizeHorizontal(ml ? themeSpacing[ml] : 0),
    marginRight: pixelSizeHorizontal(mr ? themeSpacing[mr] : 0),
    marginTop: pixelSizeVertical(mt ? themeSpacing[mt] : 0),
  }

  const cleanInjectedProps = (
    Object.keys(injectedProps) as Array<keyof FlexStyle>
  ).reduce<Record<string, (typeof injectedProps)[keyof FlexStyle]>>(
    (acc, key) => {
      const value = injectedProps[key]

      if (value !== undefined) {
        acc[key] = injectedProps[key]
      }

      return acc
    },
    {},
  )

  return cleanInjectedProps
}

function withSpaceProps<P, T>(WrappedComponent: React.ComponentType<P>) {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'

  const ComponentWithModifiers = ({
    forwardedRef,
    m,
    mb,
    mh,
    ml,
    mr,
    mt,
    mv,
    p,
    pb,
    ph,
    pl,
    pr,
    pt,
    pv,
    style,
    ...restProps
  }: WithSpaceProps<T>) => {
    const props = { m, mb, mh, ml, mr, mt, mv, p, pb, ph, pl, pr, pt, pv }

    const sx = {
      ...style,
      ...setGuideStyle<T>(props),
    }

    return (
      <WrappedComponent ref={forwardedRef} {...(restProps as P)} style={sx} />
    )
  }

  ComponentWithModifiers.displayName = `withSpaceProps(${displayName})`

  return React.forwardRef<T, P & WithSpaceProps<T>>((props, ref) => {
    return <ComponentWithModifiers {...props} forwardedRef={ref} />
  })
}

withSpaceProps.defaultProps = {
  m: undefined,
  mb: undefined,
  mh: undefined,
  ml: undefined,
  mr: undefined,
  mt: undefined,
  mv: undefined,
  p: undefined,
  pb: undefined,
  ph: undefined,
  pl: undefined,
  pr: undefined,
  pt: undefined,
  pv: undefined,
  style: {},
}

export default withSpaceProps
