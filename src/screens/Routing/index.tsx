import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { AppState } from 'app/store'
import { t } from 'app/locale'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import Loading from 'app/components/atom/Loading'

import HomeScreen from 'app/screens/Home'
import OnboardingScreen from 'app/screens/Onboarding'
import FindCityScreen from 'app/screens/FindCity'
import DetailScreen from 'app/screens/Detail'

import { StateMachineType } from 'app/utils/statemachine'
import * as AccountAction from 'app/store/account/Action'
import { AccountDataState } from 'app/store/account/Reducer'
import { City } from 'app/utils/weather'
import { useColors } from 'app/design'

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
    primary: useColors().primary,
    background: useColors().background,
  }
}

type RoutingProps = {
  data: AccountDataState;
  accountInfo: () => void;
}

function Routing({ data, accountInfo }: RoutingProps) {
  useEffect(() => {
    accountInfo()
  }, [])

  const renderStateNotStarted = () => <Loading />

  const renderStateLoading = () => <Loading />
  
  const renderStateLoaded = () => (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator initialRouteName={data.value?.onboarding? "Onboarding" : "Home"}>
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
    switch(data?.state) {
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

const mapStateToProps = ({ account }: AppState) => {
  return {
    data: account?.data,
  }
}

const mapDispatchToProps = {
  accountInfo: AccountAction.accountInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing);