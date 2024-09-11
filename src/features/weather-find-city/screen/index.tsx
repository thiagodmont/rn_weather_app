import React, { useState } from 'react'

import { Box, Button, Input, Text } from '@cool-core/components-atom'
import BottomSheet, {
  useBottomSheet,
} from '@cool-core/components-molecule/BottomSheet'
import { t } from '@cool-core/locale'
import { useCoreNavigation } from '@cool-core/navigation'
import { useAddCity } from '@cool-core/services-query/city'

export const FEATURE_WEATHER_FIND_CITY_ROUTE = 'FindCity'

function FindCityScreen() {
  const [inputCity, setInputCity] = useState('')
  const { dismiss, ref } = useBottomSheet()

  const { data, runSearchCity, state } = useAddCity()
  const { goBack } = useCoreNavigation()

  const handleFindCity = async () => {
    runSearchCity({ search: inputCity })
  }

  const handleSuccessAddedCity = () => {
    dismiss()
    goBack()
  }

  return (
    <Box background="background" flex ph="large" pt="large">
      <Input
        label={t('weather.find_city.input_label_search_city')}
        onChangeText={setInputCity}
        placeholder={t('weather.find_city.input_placeholder_search_city')}
        value={inputCity}
      />

      <Button
        loading={state.isLoading}
        mt="base"
        onPress={() => {
          handleFindCity()
        }}
        text={t('weather.find_city.add_city')}
      />

      {state.hasError && (
        <Box center mt="large">
          <Text.Subtitle color="red">
            {t('weather.find_city.add_city_error_message')}
          </Text.Subtitle>
        </Box>
      )}

      {state.isSuccess && (
        <BottomSheet initialVisible={true} ref={ref}>
          <Box mb="large" mh="large">
            <Text.Title textCenter>
              {t('weather.find_city.add_city_success_message')}
            </Text.Title>
            <Text.Subtitle textCenter>{data?.result?.name}</Text.Subtitle>
            <Button
              mt="large"
              onPress={handleSuccessAddedCity}
              outline
              text={t('common.ok')}
            />
          </Box>
        </BottomSheet>
      )}
    </Box>
  )
}

export default FindCityScreen
