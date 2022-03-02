export interface HttpClient {
  get: (params: HttpGetClient.Params) => Promise<any>
}
export interface HttpClientPost {
  post: (params: HttpClientPost.Params) => Promise<any>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    params: object
  }
}
export namespace HttpClientPost {
  export type Params = {
    url: string
    params: object
    body: object
  }
}
