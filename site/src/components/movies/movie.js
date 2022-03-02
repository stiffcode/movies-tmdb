import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Movie.module.css";

export default function Movie({ movie }) {
    const { id = 0, title = '', img = '', releaseDate = '' } = movie
  return (
    <div className={styles.cardMovie}>
      <a href={`/movie/${id}`}>
        <div className={styles.cardBody}>
          <Image
            width={341}
            height={424}
            src={`https://image.tmdb.org/t/p/w500${img}`}
            alt={`Imagem ilustrativa do filme ${title}`}
            layout="responsive"
          />
          <h3>{title}</h3>
          <span>{releaseDate}</span>
        </div>
      </a>
    </div>
  );
}
