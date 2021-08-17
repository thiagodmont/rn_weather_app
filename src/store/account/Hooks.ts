import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountInfo, saveAccountOnboarding } from 'app/store/account/Action'
import { accountSelector, AccountSelector } from 'app/store/account/Selector'

interface UseAccountStore extends AccountSelector {
  accountInfo: () => void;
  saveAccountOnboarding: () => void;
}

export const useAccountStore = (): UseAccountStore => {
  const dispatch = useDispatch()
  const { data, viewState, error } = useSelector(accountSelector)

  const _accountInfo = useCallback(async() => await accountInfo()(dispatch), [dispatch])
  const _saveAccountOnboarding = useCallback(async() => await saveAccountOnboarding()(), [])

  return {
    data,
    viewState,
    error,
    accountInfo: _accountInfo,
    saveAccountOnboarding: _saveAccountOnboarding,
  }
}
