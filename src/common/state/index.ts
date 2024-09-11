export enum StateType {
  NotStarted = 'NotStarted',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
}

export interface StateInterface {
  current: StateType
  isNotStarted: boolean
  isLoading: boolean
  isSuccess: boolean
  hasError: boolean
}

class State implements StateInterface {
  readonly state: StateType

  constructor(state: StateType) {
    this.state = state
  }

  static get NotStarted() {
    return new State(StateType.NotStarted)
  }

  static get Loading() {
    return new State(StateType.Loading)
  }

  static get Success() {
    return new State(StateType.Success)
  }

  static get Error() {
    return new State(StateType.Error)
  }

  get current() {
    return this.state
  }

  get isNotStarted() {
    return this.state === StateType.NotStarted
  }

  get isLoading() {
    return this.state === StateType.Loading
  }

  get isSuccess() {
    return this.state === StateType.Success
  }

  get hasError() {
    return this.state === StateType.Error
  }
}

export const NotStarted = State.NotStarted
export const Loading = State.Loading
export const Success = State.Success
export const Error = State.Error
