import { GuestSessionRepository } from '@/data/protocols/guest'
import { RatingMovieRepository } from '@/data/protocols/movies'
import { RatingMovie } from '@/domain/usecases'

export class HttpRatingMovie implements RatingMovie {
  constructor (
    private readonly movieRepository: RatingMovieRepository & GuestSessionRepository
  ) {}

  async addRating (params: RatingMovie.Params): Promise<RatingMovie.Result> {
    const { id, valueRating } = params

    const sessionId = await this.movieRepository.newSession()
    if (!sessionId) {
      return false
    }
    const rating = await this.movieRepository.addRating({
      id,
      valueRating,
      sessionId
    })
    return rating
  }
}
