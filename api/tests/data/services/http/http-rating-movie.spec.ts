import { RatingMovieRepository } from '@/data/protocols/movies'
import { GuestSessionRepository } from '@/data/protocols/guest'
import { mock, MockProxy } from 'jest-mock-extended'
import { HttpRatingMovie } from '@/data/services'
describe('HttpRatingMovie Services', () => {
  let movieRepositoryStub: MockProxy<RatingMovieRepository & GuestSessionRepository>
  let sut: HttpRatingMovie
  let fakeRequest: RatingMovieRepository.Params
  beforeAll(() => {
    fakeRequest = {
      id: 5,
      valueRating: 5,
      sessionId: 'valid_token'
    }
  })
  beforeEach(() => {
    movieRepositoryStub = mock()
    movieRepositoryStub = mock()
    movieRepositoryStub.addRating.mockReturnValue(
      new Promise((resolve) => resolve(false))
    )
    movieRepositoryStub.newSession.mockReturnValue(new Promise(resolve => resolve('valid_token')))
    sut = new HttpRatingMovie(movieRepositoryStub)
  })
  it('should call RatingMovieRepository with correct values', async () => {
    await sut.addRating(fakeRequest)
    expect(movieRepositoryStub.addRating).toHaveBeenCalledWith(
      fakeRequest
    )
    expect(movieRepositoryStub.addRating).toHaveBeenCalledTimes(1)
  })
  it('should throw if RatingMovieRepository throws', async () => {
    movieRepositoryStub.addRating.mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.addRating(fakeRequest)
    void expect(promise).rejects.toThrow()
  })
  it('should RatingMovieRepository return movies', async () => {
    movieRepositoryStub.addRating.mockResolvedValueOnce(
      new Promise((resolve) => resolve(true))
    )
    const ratingResponse = await sut.addRating(fakeRequest)
    void expect(ratingResponse).toEqual(true)
  })
  it('should RatingMovieRepository returns false if newSession return null', async () => {
    movieRepositoryStub.newSession.mockResolvedValueOnce(
      new Promise((resolve) => resolve(null))
    )
    const ratingResponse = await sut.addRating(fakeRequest)
    void expect(ratingResponse).toEqual(false)
  })
})
