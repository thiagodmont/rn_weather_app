import Sunny from 'app/assets/sunny.svg'
import Night from 'app/assets/night.svg'
import CloudyDay from 'app/assets/cloudy_day.svg'
import CloudyNight from 'app/assets/cloudy_night.svg'
import Cloudy from 'app/assets/cloudy.svg'
import Rain from 'app/assets/rain.svg'
import Thunderstorm from 'app/assets/thunderstorm.svg'
import Snow from 'app/assets/snow.svg'

interface Spaces {
  XXSmall: 2;
  XSmall: 4;
  Small: 8;
  Medium: 16;
  Large: 32;
  XLarge: 64;
}

interface FontSize {
  Level1: 48;
  Level2: 38;
  Level3: 28;
  Level4: 24;
  MediumBody: 18;
  SmallBody: 14;
}

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  danger: string;
}

export const useSpaces = (): Spaces => {
  return {
    XXSmall: 2,
    XSmall: 4,
    Small: 8,
    Medium: 16,
    Large: 32,
    XLarge: 64
  }
}

export const useFontSize = (): FontSize => {
  return {
    SmallBody: 14,
    MediumBody: 18,
    Level4: 24,
    Level3: 28,
    Level2: 38,
    Level1: 48,
  }
}

export const useColors = (): Colors => {
  return {
    primary: '#264653',
    secondary: '#2a9d8f',
    background: '#FFFFFF',
    danger: '#EC4E20'
  }
}

export const Vector = {
  Sunny,
  Night,
  CloudyDay,
  CloudyNight,
  Cloudy,
  Rain,
  Thunderstorm,
  Snow
}