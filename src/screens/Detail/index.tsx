import * as React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import Button from 'app/components/atom/Button'
import { DetailScreenRouteProp } from 'app/screens/Routing'
import Weather from 'app/utils/weather'
import * as CityAction from 'app/store/city/Action'
import useNav from 'app/navigation'
import ComponentStyle from 'app/screens/Detail/styles'

type Props = {
  route: DetailScreenRouteProp;
  removeCities: (id: number) => Promise<void>;
}

function DetailScreen({ route, removeCities }: Props) {
  const { navGoBack } = useNav()
  const { city } = route.params

  const handleRemoveCity = async () => {
    await removeCities(city.id)
    navGoBack()
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
                <Text>Min.</Text>
                <Text>{Weather.convertTemperatureToCelsius(city.main?.temp_min)}</Text>
              </View>
              <View style={style.infoBoxData}>
                <Text>Max.</Text>
                <Text>{Weather.convertTemperatureToCelsius(city.main?.temp_max)}</Text>
              </View>
            </View>
          </View>
          <Button
            style={style.button}
            text="Remover cidade"
            onPress={async () => await handleRemoveCity()}
          />
        </SafeAreaView>
      )}
    </ComponentStyle>
  )
}

const mapDispatchToProps = {
  removeCities: CityAction.removeCities,
}

export default connect(null, mapDispatchToProps)(DetailScreen)
