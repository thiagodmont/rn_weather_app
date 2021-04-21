
export enum StateMachineType {
  NotStarted = "NotStarted",
  Loading = "Loading",
  Loaded = "Loaded",
  Error = "Error",
}

class StateMachine {
  static isLoading (currentState?: StateMachineType) {
    return currentState === StateMachineType.Loading
  }
}

export default StateMachine