import { MovieResultModel } from '@/domain/models'

export interface LoadMovieResultRepository {
  loadById: (id: number) => Promise<LoadMovieResultRepository.Result>
}

export namespace LoadMovieResultRepository {
  export type Result = MovieResultModel
}
