import React from 'react'

import { Weather } from '@cool-core/common/weather'
import { Box, BoxPressable, Text } from '@cool-core/components-atom'
import { useStyles } from '@cool-core/design/useStyles'

import type { City } from '@cool-core/services-query/city/types'

type Props = {
  city: City
  onPress?: () => void
}

export const CityWeather: React.FC<Props> = ({ city, onPress }) => {
  const styles = useStyles((theme) => ({
    container: {
      alignItems: 'stretch',
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.primary,
      borderRadius: 8,
      borderWidth: 1.5,
      flex: 1,
      flexDirection: 'row-reverse',
      paddingHorizontal: theme.spacing.large,
      paddingVertical: theme.spacing.base,
    },
  }))

  const [weather] = city.weather || []

  return (
    <BoxPressable onPress={onPress} style={styles.container}>
      <Box>
        <Weather.icon icon={weather.icon} />
      </Box>
      <Box flex>
        <Text.Title>
          {Weather.convertTemperatureToCelsius(city.main?.temp)}
        </Text.Title>
        <Text.Subtitle>{city.name}</Text.Subtitle>
      </Box>
    </BoxPressable>
  )
}
