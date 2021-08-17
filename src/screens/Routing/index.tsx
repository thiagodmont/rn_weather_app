import React, { useEffect } from 'react'
import { t } from 'app/locale'

import { NavigationContainer, DefaultTheme, RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import Loading from 'app/components/atom/Loading'

import HomeScreen from 'app/screens/Home'
import OnboardingScreen from 'app/screens/Onboarding'
import FindCityScreen from 'app/screens/FindCity'
import DetailScreen from 'app/screens/Detail'

import { StateMachineType } from 'app/utils/statemachine'
import { City } from 'app/utils/weather'
import { Colors } from 'app/design'
import { useAccountStore } from 'app/store/account/Hooks'

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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.Primary,
    background: Colors.White,
  }
}

function Routing() {
  const { data, viewState, accountInfo } = useAccountStore()

  useEffect(() => {
    accountInfo()
  }, [accountInfo])

  const renderStateNotStarted = () => <Loading />

  const renderStateLoading = () => <Loading />
  
  const renderStateLoaded = () => (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator initialRouteName={data?.onboarding? "Onboarding" : "Home"}>
        <RootStack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: t("cities"),
          }} />
        <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
        <RootStack.Screen name="FindCity" component={FindCityScreen} />
        <RootStack.Screen name="Detail" component={DetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )

  const rendering = () => {
    switch(viewState) {
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
