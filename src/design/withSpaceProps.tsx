import React from "react"
import { ViewStyle } from "react-native"
import { pixelSizeHorizontal, pixelSizeVertical } from "app/design/normalize"

export enum Space {
  None = 0,
  XXSmall = 2,
  XSmall = 4,
  Small = 8,
  Medium = 16,
  Large = 24,
  XLarge = 32,
  XXLarge = 48,
  XXXLarge = 64,
}

export type WithSpaceProps = {
  m?: Space;
  mb?: Space;
  mh?: Space;
  ml?: Space;
  mr?: Space;
  mt?: Space;
  mv?: Space;
  p?: Space;
  pb?: Space;
  ph?: Space;
  pl?: Space;
  pr?: Space;
  pt?: Space;
  pv?: Space;
  forwardedRef?: any;
  style?: any;
}

export const getValueByScale = (space?: Space) => {
  return space ? space.valueOf() : undefined;
}

function definePadding(p?: Space, ph?: Space, pv?: Space) {
  if (p) {
    return {
      paddingHorizontal: pixelSizeHorizontal(getValueByScale(p)),
      paddingVertical: pixelSizeVertical(getValueByScale(p)),
    }
  }

  let paddings = {}
  
  if (ph) {
    paddings = {
      ...paddings,
      paddingHorizontal: pixelSizeHorizontal(getValueByScale(ph)),
    }
  }
  
  if (pv) {
    paddings = {
      ...paddings,
      paddingVertical: pixelSizeVertical(getValueByScale(pv)),
    }
  }

  return paddings
}

function defineMargin(m?: Space, mh?: Space, mv?: Space) {
  if (m) {
    return {
      marginHorizontal: pixelSizeHorizontal(getValueByScale(m)),
      marginVertical: pixelSizeVertical(getValueByScale(m)),
    }
  }

  let margins = {}
  
  if (mh) {
    margins = {
      ...margins,
      marginHorizontal: pixelSizeHorizontal(getValueByScale(mh)),
    }
  }
  
  if (mv) {
    margins = {
      ...margins,
      marginVertical: pixelSizeVertical(getValueByScale(mv)),
    }
  }

  return margins
}

function setGuideStyle({
  p,
  pb,
  ph,
  pl,
  pr,
  pt,
  pv,
  m,
  mb,
  mh,
  ml,
  mr,
  mt,
  mv,
}: WithSpaceProps): ViewStyle {
  const injectedProps: ViewStyle = {
    ...definePadding(p, ph, pv),
    paddingTop: pixelSizeVertical(getValueByScale(pt)),
    paddingRight: pixelSizeHorizontal(getValueByScale(pr)),
    paddingBottom: pixelSizeVertical(getValueByScale(pb)),
    paddingLeft: pixelSizeHorizontal(getValueByScale(pl)),
    ...defineMargin(m, mh, mv),
    marginTop: pixelSizeVertical(getValueByScale(mt)),
    marginRight: pixelSizeHorizontal(getValueByScale(mr)),
    marginBottom: pixelSizeVertical(getValueByScale(mb)),
    marginLeft: pixelSizeHorizontal(getValueByScale(ml)),
  }

  const cleanInjectedProps = Object.keys(injectedProps).reduce((acc, key) => {
    const _acc = acc;
    if (injectedProps[key] !== undefined) _acc[key] = injectedProps[key];
    return _acc;
  }, {})

  return cleanInjectedProps
}

function withSpaceProps<P, T>(
  WrappedComponent: React.ComponentType<P>
) {
  const displayName = WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"

  const ComponentWithModifiers = ({
    m,
    mt,
    mr,
    mb,
    ml,
    mh,
    mv,
    p,
    pt,
    pr,
    pb,
    pl,
    ph,
    pv,
    forwardedRef,
    style,
    ...restProps
    }: WithSpaceProps) => {
      const props = { p, pt, pr, pb, pl, ph, pv, m, mt, mr, mb, ml, mh, mv }
    
    const sx = {
      ...style,
      ...setGuideStyle(props),
    }

    return <WrappedComponent ref={forwardedRef} {...restProps as P} style={sx} />
  }

  ComponentWithModifiers.displayName = `withSpaceProps(${displayName})`

  return React.forwardRef<T, P & WithSpaceProps>((props, ref) => {
    return <ComponentWithModifiers {...props} forwardedRef={ref} />;
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
  forwardedRef: undefined,
  style: {},
}

export default withSpaceProps
