import { LoadMovieResultRepository } from '@/data/protocols/movies'
import { LoadMovie } from '@/domain/usecases'

export class HttpLoadMovieResult implements LoadMovie {
  constructor (
    private readonly loadMovieResultRepository: LoadMovieResultRepository
  ) {}

  async loadById (params: LoadMovie.Params): Promise<LoadMovie.Result> {
    const movie = await this.loadMovieResultRepository.loadById(params.id)
    return movie
  }
}
