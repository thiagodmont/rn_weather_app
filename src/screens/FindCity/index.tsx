import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import ComponentStyle from 'app/screens/FindCity/styles'
import Input from 'app/components/atom/Input'
import Button from 'app/components/atom/Button'
import * as FindCityAction from 'app/store/findCity/Action'
import { AppState } from 'app/store'
import { FindCityDataState } from 'app/store/findCity/Reducer'
import StateMachine from 'app/utils/statemachine'
import ErrorText from 'app/components/atom/ErrorText'
import { t } from 'app/locale'
import { FindCityScreenNavigationProp } from 'app/screens/Routing'

type Props = {
  navigation: FindCityScreenNavigationProp;
  data: FindCityDataState | undefined;
  findWeatherCity: (city: string) => Promise<{ hasError: boolean }>;
}

function FindCityScreen({ navigation, data, findWeatherCity }: Props) {
  const [inputCity, setInputCity] = useState("")

  const handleFindCity = async () => {
    const result = await findWeatherCity(inputCity)

    if (!result.hasError) {
      navigation.navigate("Home")
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

          {data?.error && (
            <ErrorText message={t('error_find_city')} />
          )}

          <Button
            text="Procurar"
            style={style.button}
            onPress={() => handleFindCity()}
            loading={StateMachine.isLoading(data?.state)}
          />
        </View>
      )}
    </ComponentStyle>
  )
}

const mapStateToProps = ({ findCity }: AppState) => {
  return {
    data: findCity?.data,
  }
}

const mapDispatchToProps = {
  findWeatherCity: FindCityAction.findWeatherCity,
}

export default connect(mapStateToProps, mapDispatchToProps)(FindCityScreen);