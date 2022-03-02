import { mock, MockProxy } from 'jest-mock-extended'
import { HttpNewGuestSession } from '@/data/services'
import { GuestSessionRepository } from '@/data/protocols/guest'

describe('HttpRatingMovie Services', () => {
  let guestSessionRepositoryStub: MockProxy<GuestSessionRepository>
  let sut: HttpNewGuestSession
  beforeEach(() => {
    guestSessionRepositoryStub = mock()
    guestSessionRepositoryStub.newSession.mockReturnValue(
      new Promise((resolve) => resolve('any_session'))
    )
    sut = new HttpNewGuestSession(guestSessionRepositoryStub)
  })
  it('should call GuestSessionRepository with correct values', async () => {
    await sut.new()
    expect(guestSessionRepositoryStub.newSession).toHaveBeenCalledWith()
    expect(guestSessionRepositoryStub.newSession).toHaveBeenCalledTimes(1)
  })
  it('should throw if GuestSessionRepository throws', async () => {
    guestSessionRepositoryStub.newSession.mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.new()
    void expect(promise).rejects.toThrow()
  })
  it('should RatingMovieRepository return an valid session', async () => {
    guestSessionRepositoryStub.newSession.mockResolvedValueOnce(
      new Promise((resolve) => resolve('valid_session'))
    )
    const ratingResponse = await sut.new()
    void expect(ratingResponse).toBe('valid_session')
  })
  it('should RatingMovieRepository return null on fail', async () => {
    guestSessionRepositoryStub.newSession.mockResolvedValueOnce(
      new Promise((resolve) => resolve(null))
    )
    const ratingResponse = await sut.new()
    void expect(ratingResponse).toBe(null)
  })
})
