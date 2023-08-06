"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.scss";
import Card from "../Card/Card";

const Homepage = () => {
  const [movies, setmovies] = useState([]);
  const [tv, settv] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );

    setmovies(data.results);

    const data2 = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    settv(data2.data.results);
    console.log("====================================");
    console.log(tv);
    console.log("====================================");
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.div}>
        <h1>Trending</h1>
        <h2>Movies</h2>
        <div className={styles.movies}>
          {movies.map((item, i) => (
            <Card item={item} key={i} type={"movie"} />
          ))}
        </div>
        <h2>Tv Shows</h2>
        <div className={styles.tv}>
          {tv.map((item, i) => (
            <Card item={item} type={"tv"} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
