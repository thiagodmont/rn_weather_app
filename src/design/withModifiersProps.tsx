import React, { MutableRefObject } from "react"
import { ViewStyle } from "react-native"
import { Colors } from "app/design"
import { heightPixel, widthPixel } from "app/design/normalize"

interface WithModifiersProps {
  width?: number;
  height?: number;
  flex?: number | boolean | undefined;
  flexGrow?: number | boolean;
  row?: boolean;
  center?: boolean;
  centerH?: boolean;
  centerV?: boolean;
  right?: boolean;
  background?: Colors;
  transform?: number;
  forwardedRef?: MutableRefObject<any>;
  style?: any;
}

function centerView(right?: boolean, center?: boolean, centerH?: boolean, centerV?: boolean, row?: boolean) {
  let props = {}

  if (center) {
    return { justifyContent: "center", alignItems: "center" }
  }

  if (centerV === true && !row) {
    props = {...props, justifyContent: "center"}
  } else if (centerV === true && row === true) {
    props = {...props, alignItems: "center"}
  }

  if (centerH === true && !row) {
    props = {...props, alignItems: "center"}
  } else if (centerH === true && row === true) {
    props = {...props, justifyContent: "center"}
  }

  if (right === true && !row) {
    props = {...props, alignItems: "flex-end"}
  } else if (right === true && row === true) { 
    props = {...props, justifyContent: "flex-end"}
  }

  return props
}

function setGuideStyle ({
  width,
  height,
  background,
  flex,
  flexGrow,
  row,
  center,
  centerH,
  centerV,
  right,
  transform
}: WithModifiersProps): ViewStyle {
  const injectedProps: ViewStyle = {
    width: typeof(width) === "number" ? widthPixel(width) : width,
    height: typeof(height) === "number" ? heightPixel(height) : height,
    backgroundColor: background,
    flex: typeof(flex) === "boolean" ? 1 : typeof(flex) === "number" ? flex : undefined,
    flexDirection: row ? "row" : undefined,
    flexGrow: typeof(flexGrow) === "boolean" ? 1 : flexGrow,
    transform: transform ? [{ rotate: `${transform}deg` }] : undefined,
    ...centerView(right, center, centerH, centerV, row)
  }

  const cleanInjectedProps = Object.keys(injectedProps).reduce((acc, key) => {
    const _acc = acc;
    if (injectedProps[key] !== undefined) _acc[key] = injectedProps[key];
    return _acc;
  }, {})

  return cleanInjectedProps
}

function withModifiersProps<P, T>(
  WrappedComponent: React.ComponentType<P>
) {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"

  const ComponentWithModifiers = ({
    width,
    height,
    flex,
    flexGrow,
    row,
    center,
    centerH,
    centerV,
    right,
    background,
    transform,
    forwardedRef,
    style,
    ...restProps
    }: WithModifiersProps) => {
    const props = { width, height, flex, flexGrow, row, center, centerH, centerV, right, background, transform }
    
    const sx = {
      ...style,
      ...setGuideStyle(props),
    }

    return <WrappedComponent ref={forwardedRef} {...restProps as P} style={sx} />
  }

  ComponentWithModifiers.displayName = `withModifiersProps(${displayName})`

  return React.forwardRef<T, P & WithModifiersProps>((props, ref) => {
    return <ComponentWithModifiers {...props} forwardedRef={ref} />;
  })
}

withModifiersProps.defaultProps = {
  width: undefined,
  height: undefined,
  background: undefined,
  flex: undefined,
  flexGrow: undefined,
  row: undefined,
  center: undefined,
  centerH: undefined,
  centerV: undefined,
  right: undefined,
  transform: undefined,
  forwardedRef: undefined,
  style: {},
}

export default withModifiersProps
