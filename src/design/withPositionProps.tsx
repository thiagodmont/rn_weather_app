import React from "react"
import { ViewStyle } from "react-native"

type WithPositionProps = {
  position?: "relative" | "absolute";
  pTop?: number;
  pBottom?: number;
  pLeft?: number;
  pRight?: number;
  style?: any;
}

const setGuideStyle = ({
  position,
  pTop,
  pBottom,
  pLeft,
  pRight,
}: WithPositionProps): ViewStyle => {
  const injectedProps: ViewStyle = {
    position,
    top: pTop,
    bottom: pBottom,
    left: pLeft,
    right: pRight,
  }

  const cleanInjectedProps = Object.keys(injectedProps).reduce((acc, key) => {
    const _acc = acc;
    if (injectedProps[key] !== undefined) _acc[key] = injectedProps[key];
    return _acc;
  }, {})

  return cleanInjectedProps
}

const withPositionProps = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithPositionProps> => ({
  position,
  pTop,
  pBottom,
  pLeft,
  pRight,
  style,
  ...restProps
}: WithPositionProps) => {

  const props = { position, pTop, pBottom, pLeft, pRight }

  const sx = {
    ...style,
    ...setGuideStyle(props),
  }

  return <Component {...restProps as P} style={sx} />
}

withPositionProps.defaultProps = {
  position: undefined,
  pTop: undefined,
  pBottom: undefined,
  pLeft: undefined,
  pRight: undefined,
  style: {},
}

export default withPositionProps
