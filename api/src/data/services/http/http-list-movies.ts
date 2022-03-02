import { ListPopularMoviesRepository } from '@/data/protocols/movies/list-movies-repository'
import { MovieModel } from '@/domain/models'
import { ListMovies } from '@/domain/usecases'

export class HttpListMovies implements ListMovies {
  constructor (
    private readonly listMovies: ListPopularMoviesRepository
  ) {}

  async load (params: ListMovies.Params): Promise<MovieModel[]> {
    const movies = await this.listMovies.loadPopularMovies(params.page)
    return movies
  }
}
