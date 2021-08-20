import * as React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Button from 'app/components/atom/Button'
import { DetailScreenRouteProp } from 'app/screens/Routing'
import Weather from 'app/utils/weather'
import useNav from 'app/navigation'
import { useCityStore } from 'app/store/city/Hooks'
import ComponentStyle from 'app/screens/Detail/styles'

function DetailScreen() {
  const { navGoBack } = useNav()
  const { removeCities } = useCityStore()
  const route = useRoute<DetailScreenRouteProp>()
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

export default DetailScreen
