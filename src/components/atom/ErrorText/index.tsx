import React from "react"
import { Box, Body } from "app/components/atom"
import { Colors } from "app/design"
import { Space } from "app/design/withSpaceProps"

type Props = {
  message: string
}

const ErrorText = ({ message = "" }: Props) => {

  return (
    <Box pv={Space.Small}>
      <Body color={Colors.Red}>{message}</Body>
    </Box>
  )
}

export default ErrorText
