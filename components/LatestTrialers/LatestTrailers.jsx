"use client";
import { useState, useEffect } from "react";
import styles from "./LatestTrailers.module.scss";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import axios from "axios";

const LatestTrailers = ({ handleopen }) => {
  const [movies, setmovies] = useState([]);
  const fetchUpcomming = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    setmovies(data.results);
  };
  useEffect(() => {
    fetchUpcomming();
  }, []);
  return (
    <section className={styles.container}>
      <div className={styles.column}>
        <h1>Latest Trailers</h1>
        <div className={styles.videos}>
          {movies.map((movie, _i) => (
            <div
              onClick={() => {
                handleopen(movie);
              }}
              key={movie.id}
              className={styles.video}
            >
              <div className={styles.image}>
                <Image
                  src={`https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.backdrop_path}`}
                  width={1000}
                  height={1000}
                  alt="img"
                />
                <FaPlay />
              </div>
              <div className={styles.info}>
                <h2>{movie.title}</h2>
                <h3>Official trailer</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestTrailers;
