import { LoadMovie } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { ok, serverError, forbidden } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
export class LoadMovieController implements Controller {
  constructor (private readonly loadMovie: LoadMovie) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const movie = await this.loadMovie.loadById({
        id
      })
      return movie ? ok(movie) : forbidden(new InvalidParamError('id'))
    } catch (error: any) {
      return serverError(error)
    }
  }
}
