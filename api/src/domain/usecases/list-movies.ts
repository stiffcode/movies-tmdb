import { MovieModel } from '../models'

export interface ListMovies {
  load: (params: ListMovies.Params) => Promise<MovieModel[]>
}

export namespace ListMovies {
  export type Params = {
    page: number
  }
}
