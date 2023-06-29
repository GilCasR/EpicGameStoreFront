import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import noImage from "./noImageFound.jpg";

export default function Card({
  name,
  price,
  genres,
  Genres,
  image,
  id,
  handleClickCart,
  item,
}) {
  console.log(id);
  let genreList = [];

  if (genres) {
    genreList = genres;
  } else if (Genres) {
    genreList = Genres.map((genre) => ({
      id: "",
      name: genre.name,
    }));
  }

  const addCarrito = () => {};

  return (
    <div className={styles.card}>
      <Link
        to={id === -5 ? "/videogame" : id === -6 ? "#" : `/home/${id}`}
        key={id}
      >
        <img
          className={styles.image}
          src={image || noImage}
          alt="image not found"
        />
        <h3 className={styles.cardTitle}>{name}</h3>
        {/* <div className={styles.cardGenres}>
          {!(id === -5 || id === -6) && <h4>Genres: </h4>}
          <ul>
            {genreList.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div> */}
        <h3 className={styles.cardTitle}>Price: U$S {price}</h3>
      </Link>
      <button onClick={() => handleClickCart(item)}>Add to cart</button>
    </div>
  );
}
