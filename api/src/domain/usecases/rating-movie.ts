export interface RatingMovie {
  addRating: (params: RatingMovie.Params) => Promise<RatingMovie.Result>
}

export namespace RatingMovie {
  export type Params = {
    id: number
    valueRating: number
  }
  export type Result = boolean
}
