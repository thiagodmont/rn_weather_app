import React from 'react'
import { SafeAreaView, Text, ActivityIndicator } from 'react-native'
import ComponentStyle from './styles'

const Loading: React.FC<any> = () => {
  return (
    <ComponentStyle>
      {style => (
        <SafeAreaView style={style.container}>
          <Text style={style.loadingText}>Carregando aguarde...</Text>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      )}
    </ComponentStyle>
  )
}

export default Loading