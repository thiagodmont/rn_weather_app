// eslint-disable-next-line @typescript-eslint/no-require-imports
const repackCommands = require('@callstack/repack/commands')

module.exports = {
  commands: repackCommands.filter((command) =>
    command.name.startsWith('webpack')
  ),
}
