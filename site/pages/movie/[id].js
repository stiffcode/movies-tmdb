import Head from "next/head";
import axios from "axios";
import MovieResult from "../../src/components/movies/movie-result";

function Movie({ movie }) {
  const { title = "" } = movie;
  return (
    <>
      <Head>
        <title>Filme - {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MovieResult movie={movie} />
    </>
  );
}

Movie.getInitialProps = async ({ query }) => {
  const { id } = query;

  const movie = await axios
    .get(`${process.env.API_URL}/movie/${id}`)
    .then((response) => {
      const { data } = response;
      return data;
    })
    .catch((err) => {
      return {};
    });
  return { movie };
};

export default Movie;
