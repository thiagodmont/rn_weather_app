import * as React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Vector } from 'app/design'
import Button from 'app/components/atom/Button'
import * as AccountAction from 'app/store/account/Action'

import ComponentStyle from 'app/screens/Onboarding/styles'

function OnboardingScreen({ navigation, accountInfo, saveAccountOnboarding }) {

  const goHome = () => {
    saveAccountOnboarding()
    accountInfo()
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

const mapDispatchToProps = {
  accountInfo: AccountAction.accountInfo,
  saveAccountOnboarding: AccountAction.saveAccountOnboarding
}

export default connect(null, mapDispatchToProps)(OnboardingScreen);
