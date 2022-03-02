import { mockMovieResultModel } from '@/../tests/domain/model'
import { LoadMovieResultRepository } from '@/data/protocols/movies'
import { HttpLoadMovieResult } from '@/data/services/http/http-movie-result'
import { MovieModel, MovieResultModel } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadMovie } from '@/domain/usecases'

describe('HttpMovieResult Services', () => {
  let loadMovieResultRepositoryStub: MockProxy<LoadMovieResultRepository>
  let sut: HttpLoadMovieResult
  let fakeMoviesResponse: MovieResultModel
  let fakeRequest: LoadMovie.Params
  beforeAll(() => {
    fakeMoviesResponse = mockMovieResultModel()
    fakeRequest = {
      id: 1
    }
  })
  beforeEach(() => {
    loadMovieResultRepositoryStub = mock()
    loadMovieResultRepositoryStub.loadById.mockReturnValue(new Promise((resolve) => resolve(fakeMoviesResponse)))
    sut = new HttpLoadMovieResult(loadMovieResultRepositoryStub)
  })
  it('should call LoadMovieResultRepository with correct values', async () => {
    await sut.loadById(fakeRequest)
    expect(loadMovieResultRepositoryStub.loadById).toHaveBeenCalledWith(1)
    expect(loadMovieResultRepositoryStub.loadById).toHaveBeenCalledTimes(1)
  })
  it('should throw if LoadMovieResultRepository throws', async () => {
    loadMovieResultRepositoryStub.loadById.mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.loadById(fakeRequest)
    void expect(promise).rejects.toThrow()
  })
  it('should LoadMovieResultRepository return movies', async () => {
    loadMovieResultRepositoryStub.loadById.mockResolvedValueOnce(new Promise(resolve => resolve(fakeMoviesResponse)))
    const movies = await sut.loadById(fakeRequest)
    void expect(movies).toEqual(fakeMoviesResponse)
  })
})
