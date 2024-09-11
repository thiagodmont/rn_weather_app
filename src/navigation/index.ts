import { useNavigation } from '@react-navigation/native'

export const useCoreNavigation = () => {
  const nav = useNavigation()

  function goBack() {
    nav.goBack()
  }

  return {
    goBack,
  }
}
