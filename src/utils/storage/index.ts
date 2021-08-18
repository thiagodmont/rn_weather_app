import AsyncStorage from '@react-native-async-storage/async-storage'
import { City } from 'app/utils/weather'

const get = async <T> (key: string): Promise<T | null> => {
  try {
    const val = await AsyncStorage.getItem(key);

    if (val !== null) {
      return JSON.parse(val) as T;
    }

    return val
  } catch (e) {
    return null;
  }
};

const set = async (key: string, data: any): Promise<void | null> => {
  try {
    return AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    return null;
  }
};

enum Keys {
  InfoUser = "infoUser",
  Cities = "Cities"
}

export interface InfoUser {
  onboarding: boolean
}

interface StoreCities {
  data: City[]
}

export const setInfoUser = (infoUser: InfoUser) => set(Keys.InfoUser, infoUser)

export const getInfoUser = async (): Promise<InfoUser> => {
  const info = await get<InfoUser>(Keys.InfoUser)

  if (info === null) {
    return { onboarding: true }
  } else {
    return info
  }
}

export const getCities = async (): Promise<City[]> => {
  const cities = await get<StoreCities>(Keys.Cities)

  if (cities === null) {
    return []
  } else {
    return cities.data
  }
}

export const addCity = async (city: City): Promise<void> => {
  let cities = await getCities()

  const checkCity = cities.some(c => c.id === city.id)

  if (checkCity) {
    cities = await removeCity(city.id)
  }

  await set(Keys.Cities, { data: [...cities, city] })
}

export const removeCity = async (id: number): Promise<City[]> => {
  const cities = await getCities()

  const removedData = cities.filter(city => city.id !== id)

  await set(Keys.Cities, { data: removedData })

  return removedData
}

export const clear = async () => await AsyncStorage.clear()
