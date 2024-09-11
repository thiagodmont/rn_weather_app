import React from 'react'

import { Vector } from '@cool-core/assets'
import { Box, Text } from '@cool-core/components-atom'
import { t } from '@cool-core/locale'

export function EmptyList() {
  return (
    <Box center>
      <Text.Subtitle mb="base" textCenter>
        {t('weather.home.empty_city')}
      </Text.Subtitle>
      <Vector.Sunny />
    </Box>
  )
}
