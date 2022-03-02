import { HttpRatingMovie } from '@/data/services'
import { AxiosHttpClient, TmdbApi } from '@/infra/gateways'
import { RatingMovieController } from '@/presentation/controller'
import { Controller, Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, RangeFieldValidation } from '@/validation/validators'

export const makeRatingMovieFactory = (): Controller => {
  const httpClient = new AxiosHttpClient()
  const tmdbApi = new TmdbApi(httpClient, process.env.API_TMDB_KEY ?? '')
  const httpListMovies = new HttpRatingMovie(tmdbApi)
  const validations: Validation[] = []
  for (const field of ['value', 'id']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new RangeFieldValidation('value', 0, 10))
  const validation = new ValidationComposite(validations)
  return new RatingMovieController(httpListMovies, validation)
}
