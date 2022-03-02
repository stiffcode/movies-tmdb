import Head from 'next/head'
import Image from 'next/image'
import ListMovies from '../src/components/movies/list-movies'
import styles from '../styles/Home.module.css'
import axios from 'axios'
function Home({ movies }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de filmes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListMovies movies={movies}/>
    </div>
  )
}

Home.getInitialProps = async ({ query }) => {
  const movies = await axios.get(`${process.env.API_URL}/movies?page=1`).then(response => {
    const {data} = response
    return data
  }).catch(err => {
    console.log('err',err)
    return []
  })
  
  return { movies };
};

export default Home
