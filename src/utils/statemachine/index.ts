export enum StateMachineType {
  NotStarted = "NotStarted",
  Loading = "Loading",
  Loaded = "Loaded",
  Error = "Error",
  Success = "Success",
}
class StateMachine {
  readonly state: StateMachineType;

  constructor(state: StateMachineType) {
      this.state = state
  }

  static get NotStarted() { return new StateMachine(StateMachineType.NotStarted) }

  static get Loading() { return new StateMachine(StateMachineType.Loading) }

  static get Loaded() { return new StateMachine(StateMachineType.Loaded) }

  static get Error() { return new StateMachine(StateMachineType.Error) }

  static get Success() { return new StateMachine(StateMachineType.Success) }

  get isNotStarted () {
    return this.state === StateMachineType.NotStarted
  }

  get isLoading () {
    return this.state === StateMachineType.Loading
  }

  get isError () {
    return this.state === StateMachineType.Error
  }

  get isSuccess () {
    return this.state === StateMachineType.Success
  }

  get isLoaded () {
    return this.state === StateMachineType.Loaded
  }
}

export default StateMachine
