import React from 'react'

import { useTheme } from '@react-navigation/native'

import { themeColors } from './theme'

import type { Theme, ThemeColors } from './theme'
import type { ViewStyle } from 'react-native'

export interface WithBorderProps<T> {
  debug?: boolean
  border?: ViewStyle['borderWidth'] | boolean
  borderColor?: ThemeColors
  borderL?: ViewStyle['borderLeftWidth'] | boolean
  borderR?: ViewStyle['borderRightWidth'] | boolean
  borderT?: ViewStyle['borderTopWidth'] | boolean
  borderB?: ViewStyle['borderBottomWidth'] | boolean
  radius?: ViewStyle['borderRadius']
  radiusTL?: ViewStyle['borderTopLeftRadius']
  radiusTR?: ViewStyle['borderTopRightRadius']
  radiusBL?: ViewStyle['borderBottomLeftRadius']
  radiusBR?: ViewStyle['borderBottomRightRadius']
  dashed?: boolean
  shadow?: boolean
  forwardedRef?: React.ForwardedRef<T>
  style?: ViewStyle
}

export function getShadowProperties(shadow?: boolean) {
  if (shadow) {
    return {
      elevation: 5,
      shadowColor: themeColors.black,
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    }
  }

  return {}
}

type SetGuideStyle<T> = Omit<WithBorderProps<T>, 'borderColor'> & {
  borderColor?: string
}

function setGuideStyle<T>({
  border,
  borderB,
  borderColor,
  borderL,
  borderR,
  borderT,
  dashed,
  debug = false,
  radius,
  radiusBL,
  radiusBR,
  radiusTL,
  radiusTR,
  shadow,
}: SetGuideStyle<T>): ViewStyle {
  const injectedProps: ViewStyle = {
    borderBottomLeftRadius: radiusBL,
    borderBottomRightRadius: radiusBR,
    borderBottomWidth: typeof borderB === 'boolean' ? 1 : borderB,
    borderColor: debug ? themeColors.danger : borderColor,
    borderLeftWidth: typeof borderL === 'boolean' ? 1 : borderL,
    borderRadius: radius || (dashed ? 1 : undefined),
    borderRightWidth: typeof borderR === 'boolean' ? 1 : borderR,
    borderStyle: dashed ? 'dashed' : undefined,
    borderTopLeftRadius: radiusTL,
    borderTopRightRadius: radiusTR,
    borderTopWidth: typeof borderT === 'boolean' ? 1 : borderT,
    borderWidth: typeof border === 'boolean' || debug ? 1 : border,
    ...getShadowProperties(shadow),
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

function withBorderProps<P, T>(
  WrappedComponent: React.ComponentType<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & WithBorderProps<T>> & React.RefAttributes<T>
> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithBorders = ({
    border,
    borderB,
    borderColor,
    borderL,
    borderR,
    borderT,
    dashed,
    debug,
    forwardedRef,
    radius,
    radiusBL,
    radiusBR,
    radiusTL,
    radiusTR,
    shadow,
    style,
    ...restProps
  }: WithBorderProps<T>) => {
    const theme = useTheme() as Theme

    const props = {
      border,
      borderB,
      borderColor: borderColor ? theme.colors[borderColor] : undefined,
      borderL,
      borderR,
      borderT,
      dashed,
      debug,
      radius,
      radiusBL,
      radiusBR,
      radiusTL,
      radiusTR,
      shadow,
    }

    const sx = {
      ...style,
      ...setGuideStyle<T>(props),
    }

    return (
      <WrappedComponent ref={forwardedRef} {...(restProps as P)} style={sx} />
    )
  }

  ComponentWithBorders.displayName = `withBorderProps(${displayName})`

  return React.forwardRef<T, P & WithBorderProps<T>>((props, ref) => {
    return <ComponentWithBorders {...props} forwardedRef={ref} />
  })
}

withBorderProps.defaultProps = {
  border: undefined,
  borderB: undefined,
  borderColor: undefined,
  borderL: undefined,
  borderR: undefined,
  borderT: undefined,
  dashed: undefined,
  radius: undefined,
  radiusBL: undefined,
  radiusBR: undefined,
  radiusTL: undefined,
  radiusTR: undefined,
  shadow: undefined,
  style: {},
}

export default withBorderProps
