module.exports = function (api) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  api.cache(true)

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
    ]
  }
}
