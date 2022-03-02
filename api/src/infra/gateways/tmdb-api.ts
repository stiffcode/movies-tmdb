import { GuestSessionRepository } from '@/data/protocols/guest'
import { ListPopularMoviesRepository, LoadMovieResultRepository, RatingMovieRepository } from '@/data/protocols/movies'
import { MovieResultModel } from '@/domain/models'
import { HttpClientPost } from '.'
import { HttpClient } from './http-client'

export class TmdbApi implements ListPopularMoviesRepository, LoadMovieResultRepository, RatingMovieRepository, GuestSessionRepository {
  private readonly baseUrl = 'https://api.themoviedb.org/3'
  private readonly lang = 'pt-BR'

  constructor (
    private readonly httpClient: HttpClient & HttpClientPost,
    private readonly apiKey: string
  ) {}

  async loadPopularMovies (page: number): Promise<ListPopularMoviesRepository.Result> {
    return await this.httpClient.get({
      url: `${this.baseUrl}/movie/popular`,
      params: { api_key: this.apiKey, language: this.lang, page: page }
    }).then((result) => {
      if (!result) {
        return undefined
      }
      const { results } = result
      const movies = results.map((m: TmdbApi.Movie) => {
        return {
          id: m.id,
          title: m.title,
          img: m.backdrop_path,
          releaseDate: m.release_date
        }
      })
      return movies
    })
      .catch(() => (undefined))
  }

  async loadById (id: number): Promise<MovieResultModel> {
    return await this.httpClient.get({
      url: `${this.baseUrl}/movie/${id}`,
      params: { api_key: this.apiKey, language: this.lang }
    }).then((result): any => {
      if (!result) {
        return undefined
      }
      const { id = 0, backdrop_path: img = '', title = '', overview = '', release_date: releaseDate = '', genres = [], adult = false }: TmdbApi.MovieResult = result
      const movie: MovieResultModel = {
        id,
        img,
        title,
        description: overview,
        releaseDate,
        genres: genres.map((m: any) => {
          return m.name
        }),
        adult
      }
      return movie
    })
      .catch(() => (undefined))
  }

  async addRating (params: RatingMovieRepository.Params): Promise<boolean> {
    return await this.httpClient.post({
      url: `${this.baseUrl}/movie/${params.id}/rating`,
      body: { value: params.valueRating },
      params: { api_key: this.apiKey, guest_session_id: params.sessionId }
    }).then((result): any => {
      console.log('result', result)
      if (!result) {
        return false
      }
      return true
    })
      .catch((error) => {
        console.log('error', error)
        return undefined
      })
  }

  async newSession (): Promise<GuestSessionRepository.Result> {
    return await this.httpClient.get({
      url: `${this.baseUrl}/authentication/guest_session/new`,
      params: { api_key: this.apiKey }
    }).then((result): any => {
      if (!result) {
        return null
      }
      return result.guest_session_id
    })
      .catch(() => (null))
  }
}

namespace TmdbApi {
  export type MovieResult = {
    id: number
    backdrop_path: string
    title: string
    overview: string
    release_date: string
    genres: responseLoadByIdGenres[]
    adult: boolean
  }
  type responseLoadByIdGenres = {
    id: number
    name: string
  }

  export type Movie = {
    id: number
    title: string
    backdrop_path: string
    release_date: string
  }
}
