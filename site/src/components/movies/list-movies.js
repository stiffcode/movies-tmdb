import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from '../../../styles/Movie.module.css'
import Movie from "./movie";

export default function ListMovies({movies}) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.movies}>
      <h1>Filmes mais populares do ano</h1>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={"desktop"}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {movies.map((item,index) => {
              return (
                  <Movie key={index} movie={item} />
              )
          })}
        </Carousel>
      </div>
    </div>
  );
}
