import { MovieModel } from '@/domain/models'
import { HttpClient, HttpClientPost } from '@/infra/gateways'
import { TmdbApi } from '@/infra/gateways/tmdb-api'
import { MockProxy, mock } from 'jest-mock-extended'
import { mockMoviesTmdb, mockModelMovieTmdb, mockFakeMovieResultModel, mockMovieResultModel } from '../../domain/model'
import { RatingMovieRepository } from '@/data/protocols/movies'

describe('TmdbApi', () => {
  let httpClientStub: MockProxy<HttpClient & HttpClientPost>
  let apiKey: string
  let sut: TmdbApi
  let baseUrl: string
  let fakeResponseMovies: MovieModel
  const page = 1
  let fakeRequestAddRating: RatingMovieRepository.Params
  beforeAll(() => {
    apiKey = 'any_key'
    baseUrl = 'https://api.themoviedb.org/3'
    fakeResponseMovies = mockModelMovieTmdb()
    fakeRequestAddRating = {
      id: 1,
      valueRating: 5,
      sessionId: 'valid_sessionId'
    }
  })
  beforeEach(() => {
    httpClientStub = mock()
    httpClientStub.get.mockReturnValue(
      new Promise((resolve) => resolve({ results: mockMoviesTmdb() }))
    )
    httpClientStub.post.mockReturnValue(
      new Promise(resolve => resolve({ undefined }))
    )
    sut = new TmdbApi(httpClientStub, apiKey)
  })

  it('Should calls method GET with correct values', async () => {
    await sut.loadPopularMovies(1)
    expect(httpClientStub.get).toHaveBeenCalledWith({
      url: `${baseUrl}/movie/popular`,
      params: {
        api_key: apiKey,
        language: 'pt-BR',
        page
      }
    })
  })
  it('Should loadPopularMovies return movies', async () => {
    const movies = await sut.loadPopularMovies(page)
    expect(movies).toEqual([fakeResponseMovies, fakeResponseMovies])
  })
  it('Should loadPopularMovies return undefined if throws', async () => {
    httpClientStub.get.mockReset().mockRejectedValueOnce(new Error())
    const movies = await sut.loadPopularMovies(page)
    expect(movies).toBeUndefined()
  })
  it('Should calls method loadPopularMovies returns undefined if result is empty', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) => resolve(undefined))
    )
    const movies = await sut.loadPopularMovies(page)
    expect(movies).toBeUndefined()
  })

  it('Should calls method loadById with correct values', async () => {
    await sut.loadById(1)
    expect(httpClientStub.get).toHaveBeenCalledWith({
      url: `${baseUrl}/movie/1`,
      params: {
        api_key: apiKey,
        language: 'pt-BR'
      }
    })
  })
  it('Should loadById returns undefined if throws', async () => {
    httpClientStub.get.mockRejectedValueOnce(new Error())
    const movies = await sut.loadById(page)
    expect(movies).toBeUndefined()
  })
  it('Should loadById returns undefined if result is empty', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) => resolve(undefined))
    )
    const movies = await sut.loadById(page)
    expect(movies).toBeUndefined()
  })
  it('Should loadById returns an valid Movie if success', async () => {
    httpClientStub.get.mockReturnValueOnce(new Promise(resolve => resolve(mockFakeMovieResultModel())))
    const movie = await sut.loadById(page)
    expect(movie).toEqual(mockMovieResultModel())
  })
  it('Should newSession return with correct values', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) => resolve('any_token'))
    )
    await sut.newSession()
    expect(httpClientStub.get).toHaveBeenCalledWith({
      url: `${baseUrl}/authentication/guest_session/new`,
      params: { api_key: apiKey }
    })
  })
  it('Should newSession returns null if throws', async () => {
    httpClientStub.get.mockRejectedValueOnce(new Error())
    const movies = await sut.newSession()
    expect(movies).toBeFalsy()
  })
  it('Should newSession return null if fails', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) =>
        resolve(undefined)
      )
    )
    const sessionId = await sut.newSession()
    expect(sessionId).toBe(null)
  })
  it('Should newSession return an valid sessionId on success', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          success: true,
          guest_session_id: 'any_token'
        })
      )
    )
    const sessionId = await sut.newSession()
    expect(sessionId).toBe('any_token')
  })
  it('Should addRating return with correct values', async () => {
    httpClientStub.get.mockReturnValueOnce(
      new Promise((resolve) =>
        resolve({
          success: true
        })
      )
    )
    await sut.addRating(fakeRequestAddRating)
    expect(httpClientStub.post).toHaveBeenCalledWith({
      url: `${baseUrl}/movie/${fakeRequestAddRating.id}/rating`,
      body: { value: fakeRequestAddRating.valueRating },
      params: { api_key: apiKey, guest_session_id: fakeRequestAddRating.sessionId }
    })
  })
  it('Should addRating returns null if throws', async () => {
    httpClientStub.post.mockRejectedValueOnce(new Error())
    const rating = await sut.addRating(fakeRequestAddRating)
    expect(rating).toBeUndefined()
  })
  it('Should addRating return false if fails', async () => {
    httpClientStub.post.mockResolvedValueOnce(undefined)
    const rating = await sut.addRating(fakeRequestAddRating)
    expect(rating).toBeFalsy()
  })
  it('Should addRating success', async () => {
    httpClientStub.post.mockResolvedValueOnce({
      success: true
    })
    const rating = await sut.addRating(fakeRequestAddRating)
    expect(rating).toBe(true)
  })
})
