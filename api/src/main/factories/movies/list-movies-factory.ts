import { HttpListMovies } from '@/data/services'
import { AxiosHttpClient, TmdbApi } from '@/infra/gateways'
import { ListMoviesController } from '@/presentation/controller'
import { Controller } from '@/presentation/protocols'

export const makeListMoviesFactory = (): Controller => {
  const httpClient = new AxiosHttpClient()
  const tmdbApi = new TmdbApi(httpClient, process.env.API_TMDB_KEY ?? '')
  const httpListMovies = new HttpListMovies(tmdbApi)
  return new ListMoviesController(httpListMovies)
}
