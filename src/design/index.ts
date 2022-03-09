import Sunny from 'app/assets/sunny.svg'
import Night from 'app/assets/night.svg'
import CloudyDay from 'app/assets/cloudy_day.svg'
import CloudyNight from 'app/assets/cloudy_night.svg'
import Cloudy from 'app/assets/cloudy.svg'
import Rain from 'app/assets/rain.svg'
import Thunderstorm from 'app/assets/thunderstorm.svg'
import Snow from 'app/assets/snow.svg'
import Onboarding from 'app/assets/onboarding.svg'

export enum Spaces {
  XXSmall = 2,
  XSmall = 4,
  Small = 8,
  Medium = 16,
  Large = 32,
  XLarge = 64
}

export enum FontSize {
  // SmallBody = 14,
  // MediumBody = 18,
  // Level4 = 24,
  Caption = 12,
  Body = 14,
  Subtitle = 18,
  Title = 24,
  Level3 = 28,
  Level2 = 38,
  Level1 = 48,
}

export enum FontWeight {
  Normal = "400",
  Medium = "500",
  Semibold = "600",
  Bold = "700",
}

export enum Colors {
  Primary = "#9374b7",
  Secondary = "#6282CD",
  White = "#FFFFFF",
  Black = "#0D0B0B",
  Red = "#EB5757",
  Orange = "#F2994A",
  Yellow = "#F2C94C",
  Grey = "#C9CED6",
  GreyLight = "#F1F2F4",
  GreyMedium = "#E1E4E8",
  GreyDark = "#828282",
  Blue = "#2D9CDB",
  BlueLight = "#56CCF2",
  BlueMedium = "#2F80ED",
  Green = "#27AE60",
  GreenLight = "#6FCF97",
  GreenMedium = "#219653",
}

export const Vector = {
  Sunny,
  Night,
  CloudyDay,
  CloudyNight,
  Cloudy,
  Rain,
  Thunderstorm,
  Snow,
  Onboarding
}

export const calcSpaceHorizontal = (style: any): number => {
  let total = 0
  const { marginHorizontal, marginLeft, marginRight, paddingHorizontal, paddingLeft, paddingRight } = style
  
  if (marginHorizontal) { 
    total += (marginHorizontal * 2)
  }

  if (marginLeft) { 
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    total += marginLeft
  }

  if (marginRight) { 
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    total += marginLeft
  }

  if (paddingHorizontal) { 
    total += (paddingHorizontal * 2)
  }

  if (paddingLeft) { 
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    total += paddingLeft
  }

  if (paddingRight) { 
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    total += paddingRight
  }

  return total
}
