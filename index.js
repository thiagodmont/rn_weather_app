import { AppRegistry } from 'react-native'

import { Script, ScriptManager } from '@callstack/repack/client'

import App from './App'
import { name as appName } from './app.json'

ScriptManager.shared.addResolver((scriptId) => {
  console.log(`Resolving script ${scriptId}`)
  // In dev mode, resolve script location to dev server.
  if (__DEV__) {
    return {
      cache: false,
      url: Script.getDevServerURL(scriptId),
    }
  }

  return {
    url: Script.getFileSystemURL(scriptId),
  }
})

AppRegistry.registerComponent(appName, () => App)
