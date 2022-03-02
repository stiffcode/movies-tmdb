import { RatingMovie } from '@/domain/usecases'
import { RatingMovieController } from '@/presentation/controller'
import { ServerError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { mock, MockProxy } from 'jest-mock-extended'

describe('RatingMovie Controller', () => {
  let ratingMovieStub: MockProxy<RatingMovie>
  let validationStub: MockProxy<Validation>
  let sut: RatingMovieController
  let fakeRequest: any
  const valueRating = 5
  const movieId = 5
  beforeAll(() => {
    fakeRequest = {
      body: {
        value: valueRating
      },
      params: {
        id: movieId
      }
    }
  })

  beforeEach(() => {
    ratingMovieStub = mock()
    validationStub = mock()
    ratingMovieStub.addRating.mockReturnValue(new Promise(resolve => resolve(false)))
    validationStub.validate.mockReturnValue(null)
    sut = new RatingMovieController(ratingMovieStub, validationStub)
  })

  it('Should Call addRating with correct params', async () => {
    await sut.handle(fakeRequest)

    expect(ratingMovieStub.addRating).toHaveBeenCalledWith({
      id: movieId,
      valueRating: valueRating
    })
    expect(ratingMovieStub.addRating).toHaveBeenCalledTimes(1)
  })
  it('Should call Validation with correct values', async () => {
    await sut.handle(fakeRequest)
    expect(validationStub.validate).toHaveBeenCalledWith({
      value: valueRating,
      id: movieId
    })
  })
  it('Should return 400 if validation returns an error', async () => {
    validationStub.validate.mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
  it('Should return 500 if load throws', async () => {
    ratingMovieStub.addRating.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  it('Should return data if load success', async () => {
    ratingMovieStub.addRating.mockReturnValueOnce(new Promise(resolve => resolve(true)))
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(true)
  })
  it('Should return 403 if load returns empty', async () => {
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })
})
