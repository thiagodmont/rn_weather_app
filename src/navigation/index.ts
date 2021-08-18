import { CommonActions, useNavigation } from "@react-navigation/native"
import { NavHome, NavDetail, NavFindCity } from "app/screens/Routing"
import { City } from 'app/utils/weather'

const useNav = () => {
  const nav = useNavigation()

  /**
   * Navigate from Onboarding to Home and reset the routes stack;
   * Onboarding -> Home
   */
  function navFromOnboardingToHome() {
    nav.dispatch(
      CommonActions.reset({
        routes:[
          { name: NavHome },
        ]
      })
    )
  }

  function navGoBack() {
    nav.goBack()
  }

  function navToHome() {
    nav.navigate(NavHome)
  }

  function navToDetail(city: City) {
    nav.navigate(NavDetail, { city })
  }

  function navToFindCity() {
    nav.navigate(NavFindCity)
  }

  return {
    navFromOnboardingToHome,
    navToHome,
    navToDetail,
    navToFindCity,
    navGoBack
  }
}

export default useNav
