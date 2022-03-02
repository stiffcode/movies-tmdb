import { mockMovieModels } from '@/../tests/domain/model'
import { MovieModel } from '@/domain/models'
import { ListMovies } from '@/domain/usecases/list-movies'
import { ListMoviesController } from '@/presentation/controller'
import { ServerError } from '@/presentation/errors'
import { noContent } from '@/presentation/helpers'
import { mock, MockProxy } from 'jest-mock-extended'

describe('ListMovies Controller', () => {
  let listMovies: MockProxy<ListMovies>
  let sut: ListMoviesController
  let fakeRequest: any
  let fakeMoviesResponse: MovieModel[]

  beforeAll(() => {
    fakeRequest = {
      query: {
        page: 1
      }
    }
    fakeMoviesResponse = mockMovieModels()
  })

  beforeEach(() => {
    listMovies = mock()
    listMovies.load.mockReturnValue(new Promise(resolve => resolve(fakeMoviesResponse)))
    sut = new ListMoviesController(listMovies)
  })

  it('Should Call load with correct params', async () => {
    await sut.handle(fakeRequest)

    expect(listMovies.load).toHaveBeenCalledWith({
      page: 1
    })
    expect(listMovies.load).toHaveBeenCalledTimes(1)
  })

  it('Should return 500 if load throws', async () => {
    listMovies.load.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return data if load success', async () => {
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(fakeMoviesResponse)
  })

  it('Should return 204 if load returns empty', async () => {
    listMovies.load.mockReturnValueOnce(new Promise(resolve => resolve([])))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(noContent())
  })
})
