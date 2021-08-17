import * as React from 'react'
import { View, Text } from 'react-native'
import { Vector } from 'app/design'
import Button from 'app/components/atom/Button'
import { useAccountStore } from 'app/store/account/Hooks'
import ComponentStyle from 'app/screens/Onboarding/styles'
import { OnboardingScreenNavigationProp } from 'app/screens/Routing'
import { CommonActions } from '@react-navigation/native'

interface Props {
  navigation: OnboardingScreenNavigationProp,
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {

  const { saveAccountOnboarding } = useAccountStore()

  const goHome = () => {
    saveAccountOnboarding()
    
    navigation.dispatch(
      CommonActions.reset({
        routes:[
          { name: "Home" },
        ]
      })
    )
  }

  return (
    <ComponentStyle>
      {style => (
        <View style={style.container}>
          <Text style={style.title}>Welcome</Text>
    
          <Vector.Onboarding width={200} height={200} />
    
          <Button
            style={style.button}
            text="Iniciar"
            onPress={ () => goHome() }
          />
        </View>
      )}
    </ComponentStyle>
  )
}

export default OnboardingScreen;
