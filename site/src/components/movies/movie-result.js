import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../styles/Movie.module.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { AlertDialog } from "../alerts/alert";
import axios from "axios";
export default function MovieResult({ movie }) {
  const apiUrl = process.env.API_URL;
  const [rating, setRating] = useState(0);
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    msg: "",
  });

  const { open, msg } = alertDialog;
  const {
    id = 0,
    title = "",
    img = "",
    releaseDate = "",
    description = "",
    genres = [],
    adult = false,
  } = movie;

  const addRating = async (value) => {
    setRating(value);

    await axios
      .post(`${apiUrl}/rating/movie/${id}`, { value })
      .then((result) => {
        setAlertDialog({
          open: true,
          msg: "Sua avaliação foi realizada com sucesso!",
        });
      })
      .catch((err) => {
        setAlertDialog({
          open: true,
          msg: "Infelizmente não foi possível fazer a sua avaliação! :(",
        });
      });
  };
  return (
    <div className={styles.containerMovie}>
      <div className={styles.movieData}>
        <div className={styles.containerImg}>
          <Image
            width={500}
            height={424}
            alt={`Imagem ilustrativa do filme ${title}`}
            src={`https://image.tmdb.org/t/p/w500${img}`}
            layout="responsive"
          />
        </div>

        <div className={styles.movieBody}>
          <h1>{title}</h1>

          <span>{new Date(releaseDate).getFullYear()}</span>
          <p>
            Avaliação:
            <Stack spacing={1}>
              <Rating
                color={"secondary"}
                name="half-rating"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  addRating(newValue);
                }}
              />
            </Stack>
          </p>

          <p>
            <span className={styles.MovieAdult}>{adult && "+18"}</span>
            <span>{genres.toString().replaceAll(",", " | ")}</span>
          </p>
          <p>{description}</p>
        </div>
      </div>
      {open && (
        <AlertDialog
          open={open}
          msg={msg}
          handleClose={() =>
            setAlertDialog({
              open: false,
              msg: "",
            })
          }
        />
      )}
    </div>
  );
}
