import React, { useCallback } from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { useFocusEffect } from "@react-navigation/native"
import { AppState } from 'app/store'
import { t } from 'app/locale'
import { HomeScreenNavigationProp, HomeScreenRouteProp } from 'app/screens/Routing'
import Button from 'app/components/atom/Button'
import { CityDataState } from 'app/store/city/Reducer'
import * as CityAction from 'app/store/city/Action'
import CityWeather from 'app/components/molecule/CityWeather'
import { Vector } from 'app/design'

import ComponentStyle from 'app/screens/Home/styles'
import ManagerDate from 'app/utils/manager_date'

interface Props {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
  data: CityDataState;
  hasCities: boolean | undefined;
  getStoreCities: () => void;
}

function HomeScreen({ navigation, data, hasCities, getStoreCities }: Props) {

  useFocusEffect(useCallback(() => {
      getStoreCities()
    }, [getStoreCities])
  )

  const renderItem = ({ item }) => (
    <CityWeather 
      key={item.id} 
      city={item}
      onPress={() => navigation.navigate("Detail", { city: item })} />
  )

  return (
    <ComponentStyle>
      {style => (
        <View style={style.container}>
          {hasCities ? (
            <View>
              <Text style={style.descriptionText}>{ManagerDate.now}</Text>
              <FlatList
                data={data?.cities}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={style.spacer} />}
                keyExtractor={item => item.id.toString()}
              />

              <Button
                text="Adicionar cidades"
                onPress={() => navigation.navigate("FindCity")}
                style={style.floatButton}
              />
            </View>
          ) : (
            <>
              <Text style={style.headerText}>{ t('choose_city') }</Text>
              <Text style={style.descriptionText}>Agora é só buscar uma cidade para você acompanhar o tempo.</Text>

              <Button
                text="Adicionar cidades"
                onPress={() => navigation.navigate("FindCity")}
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

const mapStateToProps = ({ city }: AppState) => {
  return {
    data: city.data,
    hasCities: city.data.cities.length > 0 || false
  }
}

const mapDispatchToProps = {
  getStoreCities: CityAction.getStoreCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
