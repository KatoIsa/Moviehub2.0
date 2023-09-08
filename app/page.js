"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "@/components/Hero/Hero";
import Homepage from "@/components/Home/Home";
import LatestTrailers from "@/components/LatestTrialers/LatestTrailers";
import Iframe from "@/components/Iframe/Iframe";
import Image from "next/image";

export default function Home() {
  const [movies, setmovies] = useState([]);
  const [tv, settv] = useState([]);
  const [topmovies, settopmovies] = useState([]);
  const [toptv, settoptv] = useState([]);
  const [movieid, setmovieid] = useState(0);
  const [open, setopen] = useState(false);
  const [randompage, setrandompage] = useState(
    Math.floor(Math.random() * 10 + 1)
  );
  const [loading, setloading] = useState(true);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );

    setmovies(data.results);

    const data2 = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    settv(data2.data.results);

    const data3 = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=${randompage}`
    );
    settopmovies(data3.data.results);
    const data4 = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=${randompage}`
    );
    settoptv(data4.data.results);
    setloading(false);
  };
  const handleopen = (m) => {
    setmovieid(m.id);
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  return loading ? (
    <div className="loading">
      <Image
        src={"/loaderspinner.svg"}
        alt="loading"
        width={100}
        height={100}
      />
    </div>
  ) : (
    <main className={styles.main}>
      {open && (
        <Iframe
          movieid={movieid}
          handleclose={handleclose}
          open={open}
          type={"movie"}
        />
      )}
      <Hero />
      <Homepage title={"Trending"} movies={movies} tv={tv} />
      <LatestTrailers handleopen={handleopen} />
      <Homepage title={"All time popular"} movies={topmovies} tv={toptv} />
    </main>
  );
}
