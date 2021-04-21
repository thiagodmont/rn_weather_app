import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Weather, { City } from 'app/utils/weather'
import { ApiResult } from 'app/utils/fetch'
import * as FindCityAction from 'app/store/findCity/Action'

import ComponentStyle from './style'

type Props = {
  city: City;
  onPress?: () => void;
  findWeatherCityById: (id: number) => ApiResult;
}

const CityWeather: React.FC<Props> = ({ city, onPress, findWeatherCityById }) => {

  useEffect(() => {
    findCityWeather()
  }, [])

  const findCityWeather = async () => {
    const result = await findWeatherCityById(city.id)
    console.log(result)
  }

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
  );
};

const mapDispatchToProps = {
  findWeatherCityById: FindCityAction.findWeatherCityById
}

export default connect(null, mapDispatchToProps)(CityWeather)