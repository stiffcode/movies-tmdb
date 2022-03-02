import { MovieModel } from '@/domain/models'

export interface ListPopularMoviesRepository {
  loadPopularMovies: (page: number) => Promise<ListPopularMoviesRepository.Result>
}

export namespace ListPopularMoviesRepository {
  export type Result = MovieModel[]
}
