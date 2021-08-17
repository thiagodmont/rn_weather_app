import * as React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import Button from 'app/components/atom/Button'
import { setInfoUser } from 'app/utils/storage'
import * as AccountAction from 'app/store/account/Action'

function OnboardingScreen({ navigation, accountInfo }) {

  const goHome = () => {
    setInfoUser({ onboarding: false })
    accountInfo()
  }

  return (
    <View>
      <Text>Onboarding Screen</Text>

      <Button
        text="Iniciar"
        onPress={ () => goHome() }
      />
    </View>
  )
}

const mapDispatchToProps = {
  accountInfo: AccountAction.accountInfo,
}

export default connect(null, mapDispatchToProps)(OnboardingScreen);
