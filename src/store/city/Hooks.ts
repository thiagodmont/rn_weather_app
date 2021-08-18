import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreCities, removeCities } from 'app/store/city/Action'
import { citySelector, CitySelector } from 'app/store/city/Selector'

interface CityStore extends CitySelector {
  getStoreCities: () => void;
  removeCities: (id: number) => Promise<void>;
}

export const useCityStore = (): CityStore => {
  const dispatch = useDispatch()
  const { data, viewState, error, hasData } = useSelector(citySelector)

  const _getStoreCities = useCallback(async() => await getStoreCities()(dispatch), [dispatch])
  const _removeCities = useCallback(async(params) => await removeCities(params)(dispatch), [dispatch])

  return {
    data,
    viewState,
    error,
    hasData,
    getStoreCities: _getStoreCities,
    removeCities: _removeCities,
  }
}
