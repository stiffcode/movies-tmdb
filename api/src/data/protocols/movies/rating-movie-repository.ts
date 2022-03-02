export interface RatingMovieRepository {
  addRating: (params: RatingMovieRepository.Params) => Promise<RatingMovieRepository.Result>
}

export namespace RatingMovieRepository {
  export type Params = {
    id: number
    valueRating: number
    sessionId: string
  }
  export type Result = boolean
}
