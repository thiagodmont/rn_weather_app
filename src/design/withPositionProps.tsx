import React from 'react'

import type { FlexStyle, ViewStyle } from 'react-native'

type WithPositionProps<T> = {
  position?: FlexStyle['position']
  pTop?: FlexStyle['top']
  pBottom?: FlexStyle['top']
  pLeft?: FlexStyle['left']
  pRight?: FlexStyle['right']
  forwardedRef?: React.ForwardedRef<T>
  style?: ViewStyle
}

function setGuideStyle<T>({
  pBottom,
  pLeft,
  position,
  pRight,
  pTop,
}: WithPositionProps<T>): FlexStyle {
  const injectedProps: FlexStyle = {
    bottom: pBottom,
    left: pLeft,
    position,
    right: pRight,
    top: pTop,
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

function withPositionProps<P, T>(
  WrappedComponent: React.ComponentType<P>,
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & WithPositionProps<T>> & React.RefAttributes<T>
> {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithBorders = ({
    forwardedRef,
    pBottom,
    pLeft,
    position,
    pRight,
    pTop,
    style,
    ...restProps
  }: WithPositionProps<T>) => {
    const props = { pBottom, pLeft, position, pRight, pTop }

    const sx = {
      ...style,
      ...setGuideStyle(props),
    }

    return (
      <WrappedComponent ref={forwardedRef} {...(restProps as P)} style={sx} />
    )
  }

  ComponentWithBorders.displayName = `withPositionProps(${displayName})`

  return React.forwardRef<T, P & WithPositionProps<T>>((props, ref) => {
    return <ComponentWithBorders {...props} forwardedRef={ref} />
  })
}

withPositionProps.defaultProps = {
  pBottom: undefined,
  pLeft: undefined,
  position: undefined,
  pRight: undefined,
  pTop: undefined,
  style: {},
}

export default withPositionProps
