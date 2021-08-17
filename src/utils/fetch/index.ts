import Config from "app/utils/config"

export type ApiResult<T = any> = Promise<{ hasError: boolean; data: T }>

class FetchApi {
  url: string;

  constructor (url: any) {
    this.url = url;
  }

  static get weather() {
    return new FetchApi("https://api.openweathermap.org/data/2.5")
  }

  static get HttpSuccessfulOk() {
    return 200
  }

  static get HttpSuccessfulCreated() {
    return 201
  }

  static get HttpErrorBadRequest() {
    return 400
  }

  static get HttpErrorUnauthorized() {
    return 401
  }

  static get HttpErrorForbidden() {
    return 403
  }

  static get HttpErrorNotFound() {
    return 404
  }

  static hasError(code: number) {
    return code === FetchApi.HttpErrorBadRequest || code === FetchApi.HttpErrorUnauthorized || code === FetchApi.HttpErrorForbidden || code === FetchApi.HttpErrorNotFound
  }

  async get (service: string): Promise<any> {

    const options: any = {
      method: 'GET',
    }

    const url = `${this.url}${service}&appid=${Config.apiKey}`

    const response = await fetch(url, options)

    const data = await response.json()

    return {
      status: response.status,
      data
    }
  }
}

export default FetchApi;
