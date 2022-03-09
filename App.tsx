import 'react-native-gesture-handler'

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from 'app/store'
import Routing from 'app/screens/Routing'
import * as i18n from 'app/locale'

const App: React.FC<any> = () => {

  useEffect(() => {
    i18n.setI18nConfig()
  }, [])

  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

export default App
