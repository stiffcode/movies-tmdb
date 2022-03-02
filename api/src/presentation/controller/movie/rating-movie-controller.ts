import { RatingMovie } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { ok, serverError, forbidden, badRequest } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class RatingMovieController implements Controller {
  constructor (
    private readonly rating: RatingMovie,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { value } = httpRequest.body
      const { id } = httpRequest.params
      const error = this.validation.validate({
        value,
        id
      })
      if (error) {
        return badRequest(error)
      }
      const movie = await this.rating.addRating({
        id,
        valueRating: value
      })
      return movie ? ok(true) : forbidden(new InvalidParamError('id'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
