import * as React from 'react'
import { View, Text } from 'react-native'
import { Vector } from 'app/design'
import Button from 'app/components/atom/Button'
import { useAccountStore } from 'app/store/account/Hooks'
import useNav from 'app/navigation'
import ComponentStyle from 'app/screens/Onboarding/styles'

const OnboardingScreen = () => {
  const { saveAccountOnboarding } = useAccountStore()
  const { navFromOnboardingToHome } = useNav()

  const goHome = () => {
    saveAccountOnboarding()
    navFromOnboardingToHome()
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
