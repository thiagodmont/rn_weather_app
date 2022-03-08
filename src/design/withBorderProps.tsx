import React from 'react'
import { ViewStyle } from 'react-native'
import { Colors } from 'app/design'

export interface WithBorderProps {
  border?: number | boolean;
  borderColor?: Colors;
  borderL?: number | boolean;
  borderR?: number | boolean;
  borderT?: number | boolean;
  borderB?: number | boolean;
  radius?: number;
  radiusTL?: number;
  radiusTR?: number;
  radiusBL?: number;
  radiusBR?: number;
  dashed?: boolean;
  shadow?: boolean;
  forwardedRef?: any;
  style?: any;
}

export function getShadowProperties(shadow?: boolean) {
  if (shadow) {
    return {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  }

  return {}
}

function setGuideStyle({
  border,
  borderColor,
  borderL,
  borderR,
  borderT,
  borderB,
  radius,
  radiusTL,
  radiusTR,
  radiusBL,
  radiusBR,
  dashed,
  shadow,
}: WithBorderProps): ViewStyle {
  const injectedProps: ViewStyle = {
    borderColor,
    borderWidth: typeof(border) === "boolean" ? 1 : border,
    borderLeftWidth: typeof(borderL) === "boolean" ? 1 : borderL,
    borderRightWidth: typeof(borderR) === "boolean" ? 1 : borderR,
    borderTopWidth: typeof(borderT) === "boolean" ? 1 : borderT,
    borderBottomWidth: typeof(borderB) === "boolean" ? 1 : borderB,
    borderRadius: radius ? radius : dashed ? 1 : undefined,
    borderTopLeftRadius: radiusTL,
    borderTopRightRadius: radiusTR,
    borderBottomLeftRadius: radiusBL,
    borderBottomRightRadius: radiusBR,
    borderStyle: dashed ? 'dashed' : undefined,
    ...getShadowProperties(shadow),
  }

  const cleanInjectedProps = Object.keys(injectedProps).reduce((acc, key) => {
    const _acc = acc;
    if (injectedProps[key] !== undefined) _acc[key] = injectedProps[key];
    return _acc;
  }, {})

  return cleanInjectedProps
}

function withBorderProps<P, T>(
  WrappedComponent: React.ComponentType<P>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & WithBorderProps> & React.RefAttributes<T>> {
  
  const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component"

  const ComponentWithBorders = ({
    border,
    borderColor,
    borderL,
    borderR,
    borderT,
    borderB,
    radius,
    radiusTL,
    radiusTR,
    radiusBL,
    radiusBR,
    dashed,
    shadow,
    style,
    forwardedRef,
    ...restProps
  }: WithBorderProps) => {
    const props = { border, borderColor, borderL, borderR, borderT, borderB, radius, radiusTL, radiusTR, radiusBL, radiusBR, dashed, shadow }
    
    const sx = {
      ...style,
      ...setGuideStyle(props),
    }

    return <WrappedComponent ref={forwardedRef} {...restProps as P} style={sx} />
  }

  ComponentWithBorders.displayName = `withBorderProps(${displayName})`;

  return React.forwardRef<T, P & WithBorderProps>((props, ref) => {
    return <ComponentWithBorders {...props} forwardedRef={ref} />;
  })
}

withBorderProps.defaultProps = {
  border: undefined,
  borderColor: undefined,
  borderL: undefined,
  borderR: undefined,
  borderT: undefined,
  borderB: undefined,
  radius: undefined,
  radiusTL: undefined,
  radiusTR: undefined,
  radiusBL: undefined,
  radiusBR: undefined,
  dashed: undefined,
  shadow: undefined,
  forwardedRef: undefined,
  style: {},
}

export default withBorderProps
