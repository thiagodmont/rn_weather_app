import React, { useEffect } from 'react'
import { t } from 'app/locale'

import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import Loading from 'app/components/atom/Loading'

import HomeScreen from 'app/screens/Home'
import OnboardingScreen from 'app/screens/Onboarding'
import FindCityScreen from 'app/screens/FindCity'
import DetailScreen from 'app/screens/Detail'

import { StateMachineType } from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import { useAccountStore } from 'app/store/account/Hooks'

export const NavOnboarding = "Onboarding"
export const NavHome = "Home"
export const NavFindCity = "FindCity"
export const NavDetail = "Detail"

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  FindCity: undefined;
  Detail: { city: City };
}

export type OnboardingScreenRouteProp = RouteProp<RootStackParamList, 'Onboarding'>
export type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

export type FindCityScreenRouteProp = RouteProp<RootStackParamList, 'FindCity'>
export type FindCityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FindCity'>

export type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>
export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>

const RootStack = createStackNavigator()

function Routing() {
  const { data, viewState, accountInfo } = useAccountStore()

  useEffect(() => {
    accountInfo()
  }, [accountInfo])

  const renderStateNotStarted = () => <Loading />

  const renderStateLoading = () => <Loading />
  
  const renderStateLoaded = () => (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={data?.onboarding? NavOnboarding : NavHome}>
        <RootStack.Screen name={NavOnboarding} component={OnboardingScreen} />
        <RootStack.Screen 
          name={NavHome} 
          component={HomeScreen}
          options={{
            title: t("cities"),
          }} />
        <RootStack.Screen 
          name={NavFindCity} 
          component={FindCityScreen}
          options={{
            title: t("find"),
          }} />
        <RootStack.Screen name={NavDetail} component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )

  const rendering = () => {
    switch(viewState.state) {
      case StateMachineType.NotStarted:
        return renderStateNotStarted()
      case StateMachineType.Loading:
        return renderStateLoading()
      case StateMachineType.Loaded:
        return renderStateLoaded()
    }
  }
  
  return (
    <>{rendering()}</>
  )
}

export default Routing
