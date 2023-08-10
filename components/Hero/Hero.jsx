"use client";
import { useState, useEffect } from "react";
import styles from "./Hero.module.scss";
import axios from "axios";

const Hero = () => {
  const [movies, setmovies] = useState([]);
  const fetchUpcomming = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    setmovies(data.results);
  };
  useEffect(() => {
    fetchUpcomming();
  }, []);
  const backdrop = `https://www.themoviedb.org/t/p/original${
    movies[Math.floor(Math.random() * (movies.length - 2) + 1)]?.backdrop_path
  }`;
  return (
    <section
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(var(--DarkBlue), 0.8) 0%,rgba(var(--DarkBlue), 0.4)),url("${backdrop}")`,
      }}
    >
      {console.log(backdrop)}
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
