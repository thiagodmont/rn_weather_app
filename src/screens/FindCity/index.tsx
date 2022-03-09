import React, { useState } from 'react'
import { t } from 'app/locale'
import Input from 'app/components/atom/Input'
import Button from 'app/components/atom/Button'
import ErrorText from 'app/components/atom/ErrorText'
import useNav from 'app/navigation'
import { useFindCityStore } from 'app/store/findCity/Hooks'
import ComponentStyle from 'app/screens/FindCity/styles'
import { Box, Title } from 'app/components/atom'
import { Colors } from 'app/design'
import { Space } from 'app/design/withSpaceProps'

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
        <Box flex background={Colors.White} ph={Space.Large}>
          <Title textCenter mv={Space.Medium}>{t('find_city')}</Title>
          <Input 
            label="Cidade"
            placeholder="digite a cidade..."
            value={inputCity}
            onChangeText={setInputCity}
          />  

          {error && (
            <ErrorText message={t('error_find_city')} />
          )}

          <Button
            mt={Space.Medium}
            text="Procurar"
            style={style.button}
            onPress={async () => await handleFindCity()}
            loading={viewState.isLoading}
          />
        </Box>
      )}
    </ComponentStyle>
  )
}

export default FindCityScreen
