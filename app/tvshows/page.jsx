"use client";
import { useState, useEffect } from "react";
import Custompagination from "@/components/CustomPagination/CustomPagination";
import styles from "../movies/Movies.module.scss";
import axios from "axios";
import Image from "next/image";
import Card from "@/components/Card2/Card";
import Genres from "@/components/Genres";

const Page = () => {
  const [page, setPage] = useState(1);
  const [themovies, setThemovies] = useState();
  const [loading, setloading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [releaseYear, setReleaseYear] = useState();
  const [thesort, setthesort] = useState("popularity.desc");

  const thegenres =
    selectedGenre.length > 1
      ? selectedGenre.reduce((acc, curr) => acc.id + "," + curr.id)
      : selectedGenre.length == 1
      ? selectedGenre[0].id
      : "";

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=${page}&include_adult=false&include_video=false&language=en-US&first_air_date_year=${releaseYear}&sort_by=${thesort}&with_genres=${thegenres}`
    );
    setThemovies(data);
    setloading(false);
  };
  useEffect(() => {
    fetchData();
  }, [page, thesort, releaseYear, thegenres]);
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
            <h4>Sort</h4>
            <select name="sort" onChange={(e) => setthesort(e.target.value)}>
              <option value="popularity.desc">Popular Descending</option>
              <option value="popularity.asc">Popular Ascending</option>
              <option value="primary_release_date.asc">
                Release Year Ascending
              </option>
              <option value="primary_release_date.desc">
                Release Year Decending
              </option>
              <option value="vote_average.asc">Rating Ascending</option>
              <option value="vote_average.desc">Rating Decending</option>
            </select>
          </div>
          <div className={styles.filter}>
            <h4>filters</h4>
            <div className={styles.thefilters}>
              <section>
                <p>First air year</p>
                <input
                  type="number"
                  name="year"
                  id="year"
                  placeholder="Enter Valid Year"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                />
              </section>
              <section>
                <p>Select Genres</p>
                <Genres
                  setPage={setPage}
                  selectedgenre={selectedGenre}
                  setSelectedgenre={setSelectedGenre}
                  type={"tv"}
                />
              </section>
            </div>
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
