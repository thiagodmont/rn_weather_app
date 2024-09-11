import React from 'react'

import { useTheme } from '@react-navigation/native'

import { heightPixel, widthPixel } from './normalize'
import { themeSpacing } from './theme'

import type { Theme, ThemeColors, ThemeSpacing } from './theme'
import type { ViewStyle } from 'react-native'

interface WithModifiersProps<T> {
  background?: ThemeColors
  width?: ViewStyle['width']
  height?: ViewStyle['height']
  flex?: ViewStyle['flex'] | boolean
  flexGrow?: ViewStyle['flexGrow'] | boolean
  row?: boolean
  gap?: ThemeSpacing
  center?: boolean
  centerH?: boolean
  centerV?: boolean
  right?: boolean
  transform?: number
  forwardedRef?: React.ForwardedRef<T>
  style?: ViewStyle
}

function centerView(
  right?: boolean,
  center?: boolean,
  centerH?: boolean,
  centerV?: boolean,
  row?: boolean,
) {
  let props = {}

  if (center) {
    return { alignItems: 'center', justifyContent: 'center' }
  }

  if (centerV === true && !row) {
    props = { ...props, justifyContent: 'center' }
  } else if (centerV === true && row === true) {
    props = { ...props, alignItems: 'center' }
  }

  if (centerH === true && !row) {
    props = { ...props, alignItems: 'center' }
  } else if (centerH === true && row === true) {
    props = { ...props, justifyContent: 'center' }
  }

  if (right === true && !row) {
    props = { ...props, alignItems: 'flex-end' }
  } else if (right === true && row === true) {
    props = { ...props, justifyContent: 'flex-end' }
  }

  return props
}

type SetGuideStyle<T> = Omit<WithModifiersProps<T>, 'background'> & {
  background?: string
}

function setGuideStyle<T>({
  background,
  center,
  centerH,
  centerV,
  flex,
  flexGrow,
  gap,
  height,
  right,
  row,
  transform,
  width,
}: SetGuideStyle<T>): ViewStyle {
  const injectedProps: ViewStyle = {
    backgroundColor: background,
    flex:
      typeof flex === 'boolean'
        ? 1
        : typeof flex === 'number'
        ? flex
        : undefined,
    flexDirection: row ? 'row' : undefined,
    flexGrow: typeof flexGrow === 'boolean' ? 1 : flexGrow,
    gap: gap ? themeSpacing[gap] : undefined,
    height: typeof height === 'number' ? heightPixel(height) : height,
    transform: transform ? [{ rotate: `${transform}deg` }] : undefined,
    width: typeof width === 'number' ? widthPixel(width) : width,
    ...centerView(right, center, centerH, centerV, row),
  }

  const cleanInjectedProps = (
    Object.keys(injectedProps) as Array<keyof ViewStyle>
  ).reduce<Record<string, (typeof injectedProps)[keyof ViewStyle]>>(
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

function withModifiersProps<P, T>(WrappedComponent: React.ComponentType<P>) {
  const displayName =
    WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'

  const ComponentWithModifiers = ({
    background,
    center,
    centerH,
    centerV,
    flex,
    flexGrow,
    forwardedRef,
    gap,
    height,
    right,
    row,
    style,
    transform,
    width,
    ...restProps
  }: WithModifiersProps<T>) => {
    const theme = useTheme() as Theme

    const props = {
      background: background ? theme.colors[background] : undefined,
      center,
      centerH,
      centerV,
      flex,
      flexGrow,
      gap,
      height,
      right,
      row,
      transform,
      width,
    }

    const sx = {
      ...style,
      ...setGuideStyle<T>(props),
    }

    return (
      <WrappedComponent ref={forwardedRef} {...(restProps as P)} style={sx} />
    )
  }

  ComponentWithModifiers.displayName = `withModifiersProps(${displayName})`

  return React.forwardRef<T, P & WithModifiersProps<T>>((props, ref) => {
    return <ComponentWithModifiers {...props} forwardedRef={ref} />
  })
}

withModifiersProps.defaultProps = {
  background: undefined,
  center: undefined,
  centerH: undefined,
  centerV: undefined,
  flex: undefined,
  flexGrow: undefined,
  gap: undefined,
  height: undefined,
  right: undefined,
  row: undefined,
  style: {},
  transform: undefined,
  width: undefined,
}

export default withModifiersProps
