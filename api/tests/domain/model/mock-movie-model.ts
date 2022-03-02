import { MovieModel, MovieResultModel } from '@/domain/models'

type responseLoadByIdGenres = {
  id: number
  name: string
}
export type responseLoadById = {
  id: number
  backdrop_path: string
  title: string
  overview: string
  release_date: string
  genres: responseLoadByIdGenres[]
  adult: boolean
}

export const mockMovieResultModel = (): MovieResultModel => {
  return {
    id: 1,
    title: 'any_title_1',
    img: '/any_path_img_1',
    releaseDate: '2022-02-27',
    description: 'any_description',
    genres: ['any_gen'],
    adult: true
  }
}
export const mockFakeMovieResultModel = (): responseLoadById => {
  return {
    id: 1,
    title: 'any_title_1',
    backdrop_path: '/any_path_img_1',
    release_date: '2022-02-27',
    overview: 'any_description',
    genres: [{ id: 1, name: 'any_gen' }],
    adult: true
  }
}

export const mockMovieModel = (): MovieModel => {
  return {
    id: Math.floor(Math.random() * 100) + 1,
    title: 'any_title_1',
    img: '/any_path_img_1',
    releaseDate: '2022-02-27'
  }
}

export const mockMovieTmdb = (): any => {
  return {
    backdrop_path: '/any_img.jpg',
    id: 1,
    overviewp: 'any_descrciption',
    release_date: '2021-12-15',
    title: 'any_title'
  }
}
export const mockModelMovieTmdb = (): MovieModel => {
  return {
    img: '/any_img.jpg',
    id: 1,
    releaseDate: '2021-12-15',
    title: 'any_title'
  }
}
export const mockMoviesTmdb = (): any => [
  mockMovieTmdb(),
  mockMovieTmdb()
]
export const mockMovieModels = (): MovieModel[] => [
  mockMovieModel(),
  mockMovieModel()
]
