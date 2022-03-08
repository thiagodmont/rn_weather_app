import React, { useState, useRef, useEffect } from 'react'
import { TextInput, KeyboardTypeOptions, ViewStyle, NativeSyntheticEvent, NativeTouchEvent } from 'react-native'
import Voice, { SpeechResultsEvent } from '@react-native-voice/voice'
import { Box, BoxPressable, Button, Body, Subtitle, Image  } from 'app/components/atom'
import { Colors, FontWeight } from 'app/design'
import withModifiersProps from 'app/design/withModifiersProps'
import withSpaceProps, { Space } from 'app/design/withSpaceProps'
import ComponentStyle from 'app/components/molecule/Input/styles'
import { useForm } from 'app/components/molecule/Form'
import BottomSheet, { useBottomSheet } from 'app/components/molecule/BottomSheet'
import { ImageStatic } from 'app/components/atom/Image'

export const Masks = {
  DateAndYear: { regex: new RegExp(/^(\d{2})(\d{2}).*/), format: "$1/$2" }
}

type Props = {
  field: string;
  label?: string;
  initialText?: string;
  placeholder?: string;
  style?: ViewStyle;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: any;
  disabled?: boolean;
  debounce?: number;
  secureTextEntry?: boolean;
  autoCompleteType?: any;
  error?: string | null;
  mask?: { regex: any; format: string };
  maxLength?: number;
  multiline?: boolean;
  audioToText?: boolean;
  inputHeight?: number;
  onPress?: (() => void) | undefined;
  onPressIn?: (() => void) | undefined;
}

function Input({ 
  field,
  label,
  initialText,
  placeholder,
  onChangeText,
  keyboardType,
  textContentType,
  secureTextEntry,
  autoCompleteType,
  disabled,
  onPress,
  onPressIn,
  debounce,
  error,
  mask,
  maxLength,
  multiline = false,
  inputHeight,
  audioToText = false,
  style
}: Props) {
  
  const useFormContext = useForm()
  const { ref, show, dismiss } = useBottomSheet()

  const debounceTime = useRef<ReturnType<typeof setTimeout> | any>(null)
  const [textState, onChangeTextState] = useState("")
  const [recording, onRecording] = useState(false)
  const [voiceAvailable, setVoiceAvailable] = useState(false)

  useEffect(() => {
    initialText && onChangeTextState(initialText)
    return () => clearTimeout(debounceTime.current)
  }, [initialText])

  useEffect(() => {
    isSpeechAvailable()

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechResultsHandler = (e: SpeechResultsEvent) => {
    const [text] = e?.value || [""]
    onHandleChangeText(text)
  }

  const isSpeechAvailable = async () => {
    if (audioToText) {
      const available = await Voice.isAvailable()

      if (available) {
        setVoiceAvailable(true)
        Voice.onSpeechResults = onSpeechResultsHandler
      } else {
        setVoiceAvailable(false)
      }
    } else {
      setVoiceAvailable(false)
    }
  }

  const onPrepareText = (text: string): string => {
    if (mask) {
      const formatted = text.replace(mask.regex, mask.format);
      onChangeTextState(formatted)
      useFormContext?.updateFieldValue(field, formatted)

      return formatted
    } else {
      onChangeTextState(text)
      useFormContext?.updateFieldValue(field, text)
      return text
    }
  }

  const onHandleChangeText = (text: string) => {
    clearTimeout(debounceTime.current)
    const prepareText = onPrepareText(text)

    if (debounce) {
      debounceTime.current = setTimeout(() => {
        onChangeText && onChangeText(prepareText)
      }, debounce)
    } else {
      onChangeText && onChangeText(prepareText)
    }
  }

  const onVoiceTextIn = async () => {
    try {
      onRecording(true)
      await Voice.start('en-US')
    } catch (e) {
      show()
    }
  }

  const onVoiceTextOut = async () => {
    try {
      onRecording(false)
      await Voice.stop()
    } catch (e) {
      show()
    }
  }

  return (
    <ComponentStyle style={style} error={error} disabled={disabled} inputHeight={inputHeight}>
      {(styles) => (
        <>
          <BoxPressable style={styles.container} onPress={onPress}>
            {label && (<Body weight={FontWeight.Medium}>{label}</Body>)}
            {disabled? (
              <Box style={{...styles.input, ...styles.box}} height={multiline ? 128 : 48} centerV>
                <Body color={Colors.GreyDark}>{textState ? textState : placeholder}</Body>
              </Box>
            ) : (
              <Box flex row style={styles.box}>
                <TextInput
                  onChangeText={onHandleChangeText}
                  onPressIn={onPressIn}
                  value={textState}
                  placeholder={placeholder}
                  keyboardType={keyboardType}
                  textContentType={textContentType}
                  secureTextEntry={secureTextEntry}
                  style={styles.input}
                  editable={!disabled}
                  autoCompleteType={autoCompleteType}
                  clearButtonMode="always"
                  autoCapitalize="none"
                  maxLength={maxLength}
                  multiline={multiline}
                  textAlignVertical="top"
                  autoCorrect={false}
                />

                {voiceAvailable && (
                  <Box style={styles.voice} mr={Space.Small} mb={Space.Small}>
                    <BoxPressable
                      width={32} 
                      height={32} 
                      radius={24}
                      center
                      background={recording ? Colors.Red : Colors.Primary}
                      onPressIn={onVoiceTextIn}
                      onPressOut={onVoiceTextOut}>
                      <Image image={ImageStatic.Microphone} size={{ width: 16, height: 16 }} />
                    </BoxPressable>
                  </Box>
                )}
              </Box>
            )}

            {error && (<Body color={Colors.Red} mt={Space.XSmall}>{error}</Body>)}
          </BoxPressable>
          <BottomSheet ref={ref}>
            <Box mb={Space.XXLarge} mh={Space.Medium}>
              <Subtitle textCenter mv={Space.Medium}>Oops! Sorry, something wrong happens.</Subtitle>
              <Button mt={Space.Medium} text="Ok" onPress={dismiss} />
            </Box>
          </BottomSheet>
        </>
      )}
    </ComponentStyle>
  )
}

export default withSpaceProps(withModifiersProps(Input))
