"use client";
import { useState, useEffect } from "react";
import Custompagination from "@/components/CustomPagination/CustomPagination";
import styles from "../movies/Movies.module.scss";
import axios from "axios";
import Image from "next/image";
import Card from "@/components/Card2/Card";

const Page = () => {
  const [page, setPage] = useState(1);
  const [themovies, setThemovies] = useState();
  const [loading, setloading] = useState(true);
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=${page}`
    );
    setThemovies(data);
    console.log(themovies?.results);
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, [page]);
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
    <div className={styles.container}>
      <h1>Tv Shows</h1>
      <div className={styles.subcontainer}>
        <div className={styles.filters}>
          <div className={styles.sort}>
            <h1>[sort]</h1>
          </div>
          <div className={styles.filter}>
            <h1>[filters]</h1>
          </div>
        </div>
        <div className={styles.themovies}>
          {themovies?.results.map((movie, i) => (
            <Card item={movie} key={movie.id} type="tv" />
          ))}
        </div>
      </div>
      <Custompagination setPage={setPage} numberofpages={500} />
    </div>
  );
};

export default Page;
