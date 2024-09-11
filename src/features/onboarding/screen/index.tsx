import * as React from 'react'

import { Box, Button, Text } from '@cool-core/components-atom'
import { t } from '@cool-core/locale'
import { useUpdateAccountInfo } from '@cool-core/services-local/account'
import { useGetFakeUser } from '@cool-core/services-query/user'
import { useWeatherHomeNavigator } from '@cool-weather-home/navigation'

const OnboardingScreen = () => {
  const { data, isLoading } = useGetFakeUser()
  const update = useUpdateAccountInfo()
  const { goHomeWithClearHistory } = useWeatherHomeNavigator()

  const goHome = () => {
    update.mutate({ didTheOnboarding: true, name: data?.result?.name.first })
    goHomeWithClearHistory()
  }

  return (
    <Box background="background" centerH flex ph="large" pt="large">
      <Text.Title>
        {t('onboarding.welcome')}
        {data?.result?.name.first && `, ${data?.result?.name.first}`}
      </Text.Title>

      <Button
        loading={isLoading}
        mt="large"
        onPress={() => {
          goHome()
        }}
        text={t('onboarding.start')}
      />
    </Box>
  )
}

export default OnboardingScreen
