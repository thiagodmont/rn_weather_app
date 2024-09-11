import AsyncStorage from '@react-native-async-storage/async-storage'

import { City } from '@cool-core/services-query/city/types'
import { InfoUser } from '@cool-core/store/account'

const get = async <T>(key: string): Promise<T | null> => {
  try {
    const val = await AsyncStorage.getItem(key)

    if (val !== null) {
      return JSON.parse(val) as T
    }

    return val
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null
  }
}

const set = async (key: string, data: unknown): Promise<void | null> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null
  }
}

enum Keys {
  InfoUserKey = 'InfoUserKey',
  CitiesKey = 'Cities',
}

interface StoreCities {
  data: City[]
}

export const setInfoUser = async (infoUser: InfoUser) =>
  await set(Keys.InfoUserKey, infoUser)

export const getInfoUser = async (): Promise<InfoUser> => {
  const info = await get<InfoUser>(Keys.InfoUserKey)

  if (info === null) {
    return { didTheOnboarding: false }
  } else {
    return info
  }
}

export const getCities = async (): Promise<City[]> => {
  const cities = await get<StoreCities>(Keys.CitiesKey)

  if (cities === null) {
    return []
  } else {
    return cities.data
  }
}

export const addCity = async (city: City): Promise<void> => {
  let cities = await getCities()

  const checkCity = cities.some((c) => c.id === city.id)

  if (checkCity) {
    cities = await removeCity(city.id)
  }

  await set(Keys.CitiesKey, { data: [...cities, city] })
}

export const removeCity = async (id: number): Promise<City[]> => {
  const cities = await getCities()

  const removedData = cities.filter((city) => city.id !== id)

  await set(Keys.CitiesKey, { data: removedData })

  return removedData
}

export const clear = async () => {
  await AsyncStorage.clear()
}
