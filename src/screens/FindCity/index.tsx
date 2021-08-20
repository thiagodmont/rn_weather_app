import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { t } from 'app/locale'
import Input from 'app/components/atom/Input'
import Button from 'app/components/atom/Button'
import StateMachine from 'app/utils/statemachine'
import ErrorText from 'app/components/atom/ErrorText'
import useNav from 'app/navigation'
import { useFindCityStore } from 'app/store/findCity/Hooks'
import ComponentStyle from 'app/screens/FindCity/styles'

function FindCityScreen() {
  const [inputCity, setInputCity] = useState("")
  const { navToHome } = useNav()
  const { viewState, error, findWeatherCity } = useFindCityStore()

  const handleFindCity = async () => {
    const result = await findWeatherCity(inputCity)

    if (!result.hasError) {
      navToHome()
    }
  }

  return (
    <ComponentStyle>
      {style => (
        <View style={style.container}>
          <Text style={style.headerText}>Procure uma cidade</Text>
          <Input 
            label="Cidade" 
            placeholder="digite a cidade..."
            value={inputCity}
            onChangeText={(text: string) => setInputCity(text)}
          />

          {error && (
            <ErrorText message={t('error_find_city')} />
          )}

          <Button
            text="Procurar"
            style={style.button}
            onPress={async () => await handleFindCity()}
            loading={viewState.isLoading}
          />
        </View>
      )}
    </ComponentStyle>
  )
}

export default FindCityScreen
