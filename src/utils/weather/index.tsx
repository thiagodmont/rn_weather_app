import React from 'react'
import { Vector } from 'app/design'

export interface City {
  id: number;
  name?: string;
  weather: { main: string; description: string; icon: string; };
  main?: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number };
  sys?: { country: string };
  coord?: { lat: number, lon: number };
  cod: number; // Response Code
  message: string;
}

interface WeatherIcon {
  icon: string;
  size?: number;
}

class Weather {

  /**
   * Use:
   * <Weather.icon icon={city.weather.icon} />
   */
  static icon({ icon, size = 64 }: WeatherIcon) {
    switch(icon) {
      case '01d': 
        return <Vector.Sunny width={size} height={size} />
      case '01n': 
        return <Vector.Night width={size} height={size} />
      case '02d': 
        return <Vector.CloudyDay width={size} height={size} />
      case '02n': 
        return <Vector.CloudyNight width={size} height={size} />
      case '03d': 
      case '03n':
      case '04d': 
      case '04n':
        return <Vector.Cloudy width={size} height={size} />
      case '09d': 
      case '09n':
      case '10d': 
      case '10n':
        return <Vector.Rain width={size} height={size} />
      case '11d': 
      case '11n': 
        return <Vector.Thunderstorm width={size} height={size} />
      case '13d': 
      case '13n': 
        return <Vector.Snow width={size} height={size} />
      default:
        return <Vector.Cloudy width={size} height={size} />
    }
  }

  static convertTemperatureToCelsius(temperature?: number) {
    if (!temperature) {
      return "-"
    }
  
    const calc = temperature - 273.15
    return `${Math.trunc(calc)} °C`
  }
}

export default Weather
