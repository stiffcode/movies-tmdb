import { mockMovieResultModel } from '@/../tests/domain/model'
import { MovieResultModel } from '@/domain/models'
import { LoadMovie } from '@/domain/usecases'
import { LoadMovieController } from '@/presentation/controller'
import { ServerError, InvalidParamError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { mock, MockProxy } from 'jest-mock-extended'

describe('LoadMovie Controller', () => {
  let loadMovie: MockProxy<LoadMovie>
  let sut: LoadMovieController
  let fakeRequest: any
  let fakeMoviesResponse: MovieResultModel

  beforeAll(() => {
    fakeRequest = {
      params: {
        id: 1
      }
    }
    fakeMoviesResponse = mockMovieResultModel()
  })

  beforeEach(() => {
    loadMovie = mock()
    loadMovie.loadById.mockReturnValue(new Promise(resolve => resolve(fakeMoviesResponse)))
    sut = new LoadMovieController(loadMovie)
  })

  it('Should Call load with correct params', async () => {
    await sut.handle(fakeRequest)

    expect(loadMovie.loadById).toHaveBeenCalledWith({
      id: 1
    })
    expect(loadMovie.loadById).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if load throws', async () => {
    loadMovie.loadById.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return data if load success', async () => {
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(fakeMoviesResponse)
  })
  it('Should return 403 if load returns empty', async () => {
    loadMovie.loadById.mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })
})
