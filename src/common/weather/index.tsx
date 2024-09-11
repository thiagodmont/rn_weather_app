import React from 'react'

import { Vector } from '@cool-core/assets'

interface WeatherIcon {
  icon: string
  size?: number
}

export class Weather {
  /**
   * Use:
   * <Weather.icon icon={city.weather.icon} />
   */
  static icon({ icon, size = 64 }: WeatherIcon) {
    switch (icon) {
      case '01d':
        return <Vector.Sunny height={size} width={size} />
      case '01n':
        return <Vector.Night height={size} width={size} />
      case '02d':
        return <Vector.CloudyDay height={size} width={size} />
      case '02n':
        return <Vector.CloudyNight height={size} width={size} />
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Vector.Cloudy height={size} width={size} />
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <Vector.Rain height={size} width={size} />
      case '11d':
      case '11n':
        return <Vector.Thunderstorm height={size} width={size} />
      case '13d':
      case '13n':
        return <Vector.Snow height={size} width={size} />
      default:
        return <Vector.Cloudy height={size} width={size} />
    }
  }

  static convertTemperatureToCelsius(temperature?: number) {
    if (!temperature) {
      return '-'
    }

    const calc = temperature - 273.15
    return `${Math.trunc(calc)} °C`
  }
}
