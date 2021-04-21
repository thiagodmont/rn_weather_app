import * as React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import Button from 'app/components/atom/Button'
import { DetailScreenNavigationProp, DetailScreenRouteProp } from 'app/screens/Routing'
import Weather from 'app/utils/weather'
import ComponentStyle from 'app/screens/Detail/styles'
import * as CityAction from 'app/store/city/Action'

type Props = {
  route: DetailScreenRouteProp;
  navigation: DetailScreenNavigationProp;
  removeCities: (id: number) => Promise<void>;
}

function DetailScreen({ navigation, route, removeCities }: Props) {

  const { city } = route.params

  const handleRemoveCity = async () => {
    await removeCities(city.id)
    navigation.goBack()
  }

  return (
    <ComponentStyle>
      {style => (
        <SafeAreaView style={style.box}>
          <View style={style.container}>
            <Weather.icon icon={city.weather.icon} size={128} />

            <Text style={style.tempeture}>
              {Weather.convertTemperatureToCelsius(city.main?.temp)}
            </Text>
            <Text style={style.city}>
              {city.name}
            </Text>

            <View style={style.infoBox}>
              <View style={style.infoBoxData}>
                <Text>Wind</Text>
                <Text>33 m/h</Text>
              </View>
              <View style={style.infoBoxData}>
                <Text>Wind</Text>
                <Text>33 m/h</Text>
              </View>
            </View>
          </View>
          <Button
            style={style.button}
            text="Remover cidade"
            onPress={() => handleRemoveCity()}
          />
        </SafeAreaView>
      )}
    </ComponentStyle>
  )
}

const mapDispatchToProps = {
  removeCities: CityAction.removeCities,
}

export default connect(null, mapDispatchToProps)(DetailScreen);