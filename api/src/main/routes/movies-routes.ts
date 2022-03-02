/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { makeListMoviesFactory, makeLoadMovieResult } from '@/main/factories'
import { adaptRoute } from '@/main/adapters'
import { makeRatingMovieFactory } from '../factories/movies/rating-movie-factory'

export default (router: Router): void => {
  router.get('/movies', adaptRoute(makeListMoviesFactory()))
  router.get('/movie/:id', adaptRoute(makeLoadMovieResult()))
  router.post('/rating/movie/:id', adaptRoute(makeRatingMovieFactory()))
}
