export type City = {
  id: number
  name: string
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  main?: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  sys?: { country: string }
  coord?: { lat: number; lon: number }
  cod: number // Response Code
  message: string
}
