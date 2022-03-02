import { AxiosHttpClient } from '@/infra/gateways'
import axios from 'axios'

jest.mock('axios')

describe('AxiosHttp Client', () => {
  let sut: AxiosHttpClient
  let fakeAxios: jest.Mocked<typeof axios>
  let url: string
  let params: object
  let body: object

  beforeAll(() => {
    url = 'any_url'
    params = { any: 'any_value' }
    body = { any: 'any_value' }
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.get.mockResolvedValue({
      status: 200,
      data: 'any_value'
    })
    fakeAxios.post.mockResolvedValue({
      status: 200,
      data: 'any_value'
    })
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('Should call GET with correct params', async () => {
    await sut.get({ url, params })

    expect(fakeAxios.get).toHaveBeenCalledWith(url, {
      params
    })
    expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  })

  it('Should return data on success', async () => {
    const result = await sut.get({ url, params })

    expect(result).toEqual('any_value')
  })

  it('Should call POST with correct params', async () => {
    await sut.post({ url, body, params })

    expect(fakeAxios.post).toHaveBeenCalledWith(url, body, { params })
    expect(fakeAxios.post).toHaveBeenCalledTimes(1)
  })

  it('Should return data POST on success', async () => {
    const result = await sut.post({ url, body, params })

    expect(result).toEqual('any_value')
  })
})
