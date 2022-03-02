import { HttpLoadMovieResult } from '@/data/services/http/http-movie-result'
import { AxiosHttpClient, TmdbApi } from '@/infra/gateways'
import { LoadMovieController } from '@/presentation/controller'
import { Controller } from '@/presentation/protocols'

export const makeLoadMovieResult = (): Controller => {
  const httpClient = new AxiosHttpClient()
  const tmdbApi = new TmdbApi(httpClient, process.env.API_TMDB_KEY ?? '')
  const httpListMovies = new HttpLoadMovieResult(tmdbApi)
  return new LoadMovieController(httpListMovies)
}
