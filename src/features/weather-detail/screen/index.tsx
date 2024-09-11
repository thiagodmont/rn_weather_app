import * as React from 'react'

import { Weather } from '@cool-core/common/weather'
import { Box, Button, Text } from '@cool-core/components-atom'
import { t } from '@cool-core/locale'
import { useCoreNavigation } from '@cool-core/navigation'
import { useCityStore } from '@cool-core/store/city'

import { useWeatherDetailRoute } from '../navigation'

function DetailScreen() {
  const { goBack } = useCoreNavigation()
  const removeCity = useCityStore((state) => state.removeCity)
  const { city } = useWeatherDetailRoute()

  const handleRemoveCity = () => {
    removeCity(city.id)
    goBack()
  }

  const [weather] = city.weather || []

  return (
    <Box background="background" centerH flex ph="large" pt="large">
      <Weather.icon icon={weather.icon} size={128} />

      <Text.Level2>
        {Weather.convertTemperatureToCelsius(city.main?.temp)}
      </Text.Level2>
      <Text.Level3>{city.name}</Text.Level3>

      <Box mb="large" radius={8} row>
        <Box>
          <Text.Body>{t('weather.detail.temp_min')}</Text.Body>
          <Text.Body>
            {Weather.convertTemperatureToCelsius(city.main?.temp_min)}
          </Text.Body>
        </Box>
        <Box>
          <Text.Body>{t('weather.detail.temp_max')}</Text.Body>
          <Text.Body>
            {Weather.convertTemperatureToCelsius(city.main?.temp_max)}
          </Text.Body>
        </Box>
      </Box>

      <Button
        color="danger"
        onPress={handleRemoveCity}
        text={t('weather.detail.remove_city')}
      />
    </Box>
  )
}

export default DetailScreen
