import React, { useCallback } from 'react'
import { Text, View, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { t } from 'app/locale'
import Button from 'app/components/atom/Button'
import CityWeather from 'app/components/molecule/CityWeather'
import { Vector } from 'app/design'
import ManagerDate from 'app/utils/manager_date'
import useNav from 'app/navigation'
import { useCityStore } from 'app/store/city/Hooks'
import ComponentStyle from 'app/screens/Home/styles'

function HomeScreen() {
  const { navToDetail, navToFindCity } = useNav()
  const { data, hasData, getStoreCities } = useCityStore()

  useFocusEffect(useCallback(() => {
      getStoreCities()
    }, [getStoreCities])
  )

  const renderItem = ({ item }) => (
    <CityWeather 
      key={item.id} 
      city={item}
      onPress={() => navToDetail(item)} />
  )

  return (
    <ComponentStyle>
      {style => (
        <View style={style.container}>
          {hasData ? (
            <View>
              <Text style={style.descriptionText}>{ManagerDate.now}</Text>
              <FlatList
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={style.spacer} />}
                keyExtractor={item => item.id.toString()}
              />

              <Button
                text="Adicionar cidades"
                onPress={() => navToFindCity()}
                style={style.floatButton}
              />
            </View>
          ) : (
            <>
              <Text style={style.headerText}>{ t('choose_city') }</Text>
              <Text style={style.descriptionText}>Agora é só buscar uma cidade para você acompanhar o tempo.</Text>

              <Button
                text="Adicionar cidades"
                onPress={() => navToFindCity()}
              />

              <View style={style.sunny}>
                <Vector.Sunny width={128} height={128} />
              </View>
            </>
          )}
        </View>
      )}
    </ComponentStyle>
  )
}

export default HomeScreen
