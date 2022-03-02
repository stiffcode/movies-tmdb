import { mockMovieModels } from '@/../tests/domain/model'
import { ListPopularMoviesRepository } from '@/data/protocols/movies'
import { HttpListMovies } from '@/data/services/http'
import { MovieModel } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'

describe('HttpListMovies', () => {
  let listMoviesRepositoryStub: MockProxy<ListPopularMoviesRepository>
  let sut: HttpListMovies
  let fakeMoviesResponse: MovieModel[]
  beforeAll(() => {
    fakeMoviesResponse = mockMovieModels()
  })
  beforeEach(() => {
    listMoviesRepositoryStub = mock()
    listMoviesRepositoryStub.loadPopularMovies.mockReturnValue(new Promise((resolve) => resolve([])))
    sut = new HttpListMovies(listMoviesRepositoryStub)
  })
  it('should call ListMoviesRepository with correct values', async () => {
    await sut.load({ page: 1 })
    expect(listMoviesRepositoryStub.loadPopularMovies).toHaveBeenCalledWith(1)
    expect(listMoviesRepositoryStub.loadPopularMovies).toHaveBeenCalledTimes(1)
  })
  it('should throw if ListMoviesRepository throws', async () => {
    listMoviesRepositoryStub.loadPopularMovies.mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load({ page: 1 })
    void expect(promise).rejects.toThrow()
  })
  it('should ListMoviesRepository return movies', async () => {
    listMoviesRepositoryStub.loadPopularMovies.mockResolvedValueOnce(new Promise(resolve => resolve(fakeMoviesResponse)))
    const movies = await sut.load({ page: 1 })
    void expect(movies).toEqual(fakeMoviesResponse)
  })
})
