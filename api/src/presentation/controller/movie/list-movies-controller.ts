import { ListMovies } from '@/domain/usecases/list-movies'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class ListMoviesController implements Controller {
  constructor (private readonly listMovies: ListMovies) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const movies = await this.listMovies.load(httpRequest.query)
      return movies?.length ? ok(movies) : noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
