import axios from 'axios'
import { HttpClient, HttpGetClient, HttpClientPost } from './http-client'

export class AxiosHttpClient implements HttpClient, HttpClientPost {
  async get (request: HttpGetClient.Params): Promise<any> {
    const result = await axios.get(request.url, {
      params: request.params
    })
    return result.data
  }

  async post (request: HttpClientPost.Params): Promise<any> {
    const { url, body, params } = request
    const result = await axios.post(url, body, { params })
    return result.data
  }
}
