import {useEffect, useState} from 'react'
import {Keyboard, KeyboardEventListener, ScreenRect} from 'react-native'

const emptyCoordinates = Object.freeze({
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
})
const initialValue = {
  start: emptyCoordinates,
  end: emptyCoordinates,
}

export function useKeyboard() {
  const [shown, setShown] = useState(false)
  const [coordinates, setCoordinates] = useState<{
    start?: ScreenRect
    end: ScreenRect
  }>(initialValue)
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0)

  const handleKeyboardWillShow: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }
  const handleKeyboardDidShow: KeyboardEventListener = (e) => {
    setShown(true)
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
    setKeyboardHeight(e.endCoordinates.height)
  }
  const handleKeyboardWillHide: KeyboardEventListener = (e) => {
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
  }
  const handleKeyboardDidHide: KeyboardEventListener = (e) => {
    setShown(false)
    if (e) {
      setCoordinates({ start: e.startCoordinates, end: e.endCoordinates })
    } else {
      setCoordinates(initialValue)
      setKeyboardHeight(0)
    }
  }

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow)
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow)
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide)
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide)

    return () => {
      keyboardWillShow.remove()
      keyboardDidShow.remove()
      keyboardWillHide.remove()
      keyboardDidHide.remove()
    }
  }, [])

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight,
  }
}
