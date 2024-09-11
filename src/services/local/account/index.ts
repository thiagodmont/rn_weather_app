import { useMutation, useQuery } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'

import { getInfoUser, setInfoUser } from '@cool-core/common/storage'
import { InfoUser, useAccountStore } from '@cool-core/store/account'

export const usePopulateAccountInfo = () => {
  const updateAccountInfo = useAccountStore((state) => state.updateAccountInfo)

  return useQuery<InfoUser>({
    queryFn: async () => {
      const data = await getInfoUser()

      updateAccountInfo(data)

      return data
    },
    queryKey: ['account-info'],
    staleTime: 0,
  })
}

export const useUpdateAccountInfo = () => {
  const { currentData, updateAccountInfo } = useAccountStore(
    useShallow((state) => ({
      currentData: state.data,
      updateAccountInfo: state.updateAccountInfo,
    })),
  )

  return useMutation({
    mutationFn: async (data: InfoUser) => {
      const updatedData = { ...currentData, ...data }
      await setInfoUser(updatedData)
      updateAccountInfo(updatedData)
      return updatedData
    },
    onError: (error) => {
      console.log('Error updating account info', error)
    },
    onSuccess: (data) => {
      console.log('Account info updated successfully', data)
    },
  })
}
