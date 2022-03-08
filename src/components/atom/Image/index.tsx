import React, { useState, useCallback } from 'react'
import { Image as RNImage, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Box, Loading } from 'app/components/atom'
import { calcSpaceHorizontal, Colors } from 'app/design'
import withSpaceProps from 'app/design/withSpaceProps'
import withBorderProps from 'app/design/withBorderProps'
import withPositionProps from 'app/design/withPositionProps'
import ComponentStyle from 'app/components/atom/Image/styles'

import SearchSVG from 'app/assets/search.svg'
import ArrowBackSVG from 'app/assets/arrow-back.svg'
import ArrowUpSVG from 'app/assets/arrow-up.svg'
import ArrowDownSVG from 'app/assets/arrow-down.svg'
import CameraSVG from 'app/assets/camera.svg'
import NoteAddSVG from 'app/assets/note-add.svg'
import SuccessSVG from 'app/assets/success.svg'
import FlashSVG from 'app/assets/flash.svg'
import FlashSelectSVG from 'app/assets/flash-select.svg'
import CancelSVG from 'app/assets/cancel.svg'
import TurnCameraSVG from 'app/assets/turn-camera.svg'
import CheckSVG from 'app/assets/check.svg'
import MicrophoneSVG from 'app/assets/microphone.svg'
import RetakeSVG from 'app/assets/retake.svg'
import MoreSVG from 'app/assets/more.svg'

const ImageSVGBucket = {
  "search": SearchSVG,
  "arrow-back": ArrowBackSVG,
  "arrow-up": ArrowUpSVG,
  "arrow-down": ArrowDownSVG,
  "camera": CameraSVG,
  "note-add": NoteAddSVG,
  "success": SuccessSVG,
  "flash": FlashSVG,
  "flash-select": FlashSelectSVG,
  "cancel": CancelSVG,
  "turn-camera": TurnCameraSVG,
  "check": CheckSVG,
  "microphone": MicrophoneSVG,
  "retake": RetakeSVG,
  "more": MoreSVG,
}

const ImageStaticBucket = {
  "logo": require("app/assets/turnable.png")
}

export enum ImageStatic {
  ArrowBack = "arrow-back",
  ArrowUp = "arrow-up",
  ArrowDown = "arrow-down",
  Search = "search",
  Camera = "camera",
  NoteAdd = "note-add",
  Logo = "logo",
  Success = "success",
  Flash = "flash",
  FlashSelect = "flash-select",
  Cancel = "cancel",
  TurnCamera = "turn-camera",
  Check = "check",
  Microphone = "microphone",
  Retake = "retake",
  More = "more"
}

type Props = {
  image?: ImageStatic;
  imageFill?: Colors;
  source?: { uri?: string };
  size: { width: any; height?: any };
  style?: ViewStyle;
}

const Image: React.FC<Props> = ({ image, imageFill, size, source, style = {} }) => {
  const [loading, setLoading] = useState(false)
  const [dynamicHeight, setHeight] = useState(size.height)
  const [dynamicWidth, setWidth] = useState(size.width)

  const calcSpaces = useCallback(() => calcSpaceHorizontal(style), [style])()

  const getImage = (styles: any, image: ImageStatic) => {
    if (ImageStaticBucket[image]) {
      return <RNImage style={styles.staticImage} source={ImageStaticBucket[image]} resizeMode="contain" />
    } else {
      const SvgImage = ImageSVGBucket[image]
      const fill = imageFill ? { fill: imageFill } : {}
      return <SvgImage style={styles.staticImage} width={dynamicWidth} height={size?.height} {...fill}/>
    }
  }

  const onLayout = (event: any) => {
    const containerWidth = event.nativeEvent.layout.width;

    if (!size?.height && source?.uri) {
      RNImage.getSize(source?.uri, (width, height) => {
        setWidth(containerWidth - calcSpaces)
        setHeight((containerWidth * height / width) - calcSpaces / 2)
      })
    }
  }

  return (
    <ComponentStyle style={style} width={dynamicWidth} height={dynamicHeight}>
      {(styles) => (
        <>
          {image ? getImage(styles, image) : (
            <>
              <Box onLayout={onLayout}>
                <FastImage
                  style={styles.sourceImage}
                  source={{ uri: source?.uri }}
                  resizeMode={FastImage.resizeMode.contain}
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                />
                {loading && (
                  <Box style={styles.loading}>
                    <Loading color={Colors.Black} size="large" />
                  </Box>
                )}
              </Box>
            </>
          )}
        </>
      )}
    </ComponentStyle>
  )
}

export default withPositionProps(withBorderProps(withSpaceProps(Image)))
