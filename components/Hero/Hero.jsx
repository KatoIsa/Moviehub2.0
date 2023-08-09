"use client";
import { useState, useEffect } from "react";
import styles from "./Hero.module.scss";
import axios from "axios";

const Hero = ({ movies }) => {
  const randomId =
    movies[Math.floor(Math.random() * (movies.length - 1))]?.id ||
    movies[0]?.id;

  const [randombackdrop, setrandombackdrop] = useState("");
  const getImages = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${randomId}/images?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setrandombackdrop(
      data.backdrops[Math.floor(Math.random() * data.backdrops.length - 2)]
        ?.file_path
    );
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(var(--DarkBlue), 0.8) 0%,rgba(var(--DarkBlue), 0.4)),url("https://www.themoviedb.org/t/p/original${randombackdrop}")`,
      }}
    >
      <div className={styles.txt}>
        <h1>Welcome.</h1>
        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <form action="">
          <input
            type="text"
            placeholder="search for a movie, tv show, person..."
          />
          <button type="submit">search</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
