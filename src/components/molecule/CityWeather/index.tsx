import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Weather, { City } from 'app/utils/weather'
import ComponentStyle from 'app/components/molecule/CityWeather/style'

type Props = {
  city: City;
  onPress?: () => void;
}

const CityWeather: React.FC<Props> = ({ city, onPress }) => {

  return (
    <ComponentStyle> 
      {style => (
        <TouchableOpacity onPress={onPress} style={style.container}>
          <View>
            <Weather.icon icon={city.weather.icon} />
          </View>
          <View style={style.weather}>
            <Text style={style.temperature}>
              {Weather.convertTemperatureToCelsius(city.main?.temp)}
            </Text>
            <Text style={style.name}>
              {city.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </ComponentStyle>
  )
}

export default CityWeather
