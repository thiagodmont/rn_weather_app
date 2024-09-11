import 'react-native-reanimated'

import 'react-native-gesture-handler'

import React, { useEffect } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import * as i18n from '@cool-core/locale'
import { Routing } from '@cool-core/router'

const queryClient = new QueryClient()

const App = () => {
  useEffect(() => {
    i18n.setI18nConfig(i18n.DEFAULT_LANGUAGE)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Routing />
    </QueryClientProvider>
  )
}

export default App
