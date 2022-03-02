import { MovieModel } from '../models'

export interface LoadMovie {
  loadById: (params: LoadMovie.Params) => Promise<LoadMovie.Result>
}

export namespace LoadMovie {
  export type Params = {
    id: number
  }
  export type Result = MovieModel | null
}
