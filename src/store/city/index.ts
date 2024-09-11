import { create } from 'zustand'

import * as state from '@cool-core/common/state'
import { addCity, getCities, removeCity } from '@cool-core/common/storage'

import type { StateInterface } from '@cool-core/common/state'
import type { City } from '@cool-core/services-query/city/types'

type CityState = {
  data: City[]
  state: StateInterface
  hasError: boolean
  getStoreCities: () => void
  addCity: (city: City) => void
  removeCity: (id: number) => void
}

export const useCityStore = create<CityState>((set) => ({
  addCity: async (city: City) => {
    set((currentState) => ({ ...currentState, state: state.Loading }))

    await addCity(city)

    set({ hasError: false, state: state.Success })
  },
  data: [],
  getStoreCities: async () => {
    set((currentState) => ({ ...currentState, state: state.Loading }))

    const data = await getCities()

    set({ data, hasError: false, state: state.Success })
  },
  hasError: false,
  removeCity: async (id: number) => {
    set((currentState) => ({ ...currentState, state: state.Loading }))

    const data = await removeCity(id)

    set({ data, hasError: false, state: state.Success })
  },
  state: state.NotStarted,
}))
