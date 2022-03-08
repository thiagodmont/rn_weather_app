import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Colors } from 'app/design'

interface Props {
  size?: "small" | "large",
  color?: Colors
}

const Loading: React.FC<Props> = ({ size = "small", color = Colors.Secondary }) => {
  return (
    <ActivityIndicator size={size} color={color} />
  )
}

export default Loading
