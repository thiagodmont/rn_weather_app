import { create } from 'zustand'

export interface InfoUser {
  name?: string
  didTheOnboarding: boolean
}

type AccountState = {
  data: InfoUser | null
  updateAccountInfo: (data: InfoUser) => void
}

export const useAccountStore = create<AccountState>((set) => ({
  data: null,
  updateAccountInfo: async (data) => {
    set((state) => ({ ...state, data }))
  },
}))
