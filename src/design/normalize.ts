import { Dimensions, PixelRatio } from 'react-native'

import memoize from 'micro-memoize'
import { isTablet } from 'react-native-device-info'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const widthBaseScale = SCREEN_WIDTH / (isTablet() ? 834 : 414)
const heightBaseScale = SCREEN_HEIGHT / (isTablet() ? 1194 : 896)

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale

  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const memoNormalize = memoize(normalize)

// For width pixel
const widthPixel = (size: number) => {
  return memoNormalize(size, 'width')
}

// For height pixel
const heightPixel = (size: number) => {
  return memoNormalize(size, 'height')
}

// For font pixel
const fontPixel = (size: number) => {
  return heightPixel(size)
}

// For Margin and Padding vertical pixel
const pixelSizeVertical = (size?: number) => {
  return size ? heightPixel(size) : undefined
}

// For Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size?: number) => {
  return size ? widthPixel(size) : undefined
}

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
}
