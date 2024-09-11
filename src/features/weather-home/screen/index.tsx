import React, { useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { useShallow } from 'zustand/react/shallow'

import { ManagerDate } from '@cool-core/common/manager_date'
import { Box, BoxSafe, Button, Loading, Text } from '@cool-core/components-atom'
import { t } from '@cool-core/locale'
import { useAccountStore } from '@cool-core/store/account'
import { useCityStore } from '@cool-core/store/city'
import { useWeatherDetailNavigator } from '@cool-weather-detail/navigation'
import { useWeatherFindCityNavigator } from '@cool-weather-find-city/navigation'

import { CityWeather } from '../components/CityWeather'
import { EmptyList } from '../components/EmptyList'

import type { City } from '@cool-core/services-query/city/types'

function HomeScreen() {
  const { go: goToFindCity } = useWeatherFindCityNavigator()
  const { go: goToDetail } = useWeatherDetailNavigator()

  const accountData = useAccountStore((currentState) => currentState.data)

  const { data, getStoreCities, state } = useCityStore(
    useShallow((currentState) => ({
      data: currentState.data,
      getStoreCities: currentState.getStoreCities,
      state: currentState.state,
    })),
  )

  useFocusEffect(
    useCallback(() => {
      getStoreCities()
    }, [getStoreCities]),
  )

  const renderItem = ({ item }: { item: City }) => (
    <CityWeather
      city={item}
      key={item.id}
      onPress={() => {
        goToDetail({ city: item })
      }}
    />
  )

  const renderItemSeparator = () => <Box mv="small" />

  const emptyItem = () => (state.isLoading ? <Loading /> : <EmptyList />)

  return (
    <BoxSafe background="background" flex mh="large" mt="large">
      <Text.Subtitle textCenter>
        {t('weather.home.user_today', { accountName: accountData?.name })}
      </Text.Subtitle>

      <Text.Title textCenter>
        {data ? ManagerDate.now : t('weather.home.choose_city')}
      </Text.Title>

      <Button
        mb="base"
        mt="base"
        onPress={() => {
          goToFindCity()
        }}
        text={t('weather.home.add_city')}
      />

      <FlashList
        data={data}
        estimatedItemSize={data?.length <= 0 ? 1 : data.length}
        ItemSeparatorComponent={renderItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => emptyItem()}
        renderItem={renderItem}
      />
    </BoxSafe>
  )
}

export default HomeScreen
