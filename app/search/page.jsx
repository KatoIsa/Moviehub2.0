"use client";
import { useRef, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import axios from "axios";
import Image from "next/image";
import Custompagination from "@/components/CustomPagination/CustomPagination";
import Link from "next/link";

const Page = () => {
  const [query, setQuery] = useState("");
  const [loading, setloading] = useState();
  const [movieResults, setmovieresults] = useState();
  const [tvResults, settvresults] = useState();
  const [peopleResults, setpeopleresults] = useState();
  const [filter, setfilter] = useState();
  const [pagemovie, setPagemovie] = useState(1);
  const [pagetv, setPagetv] = useState(1);
  const [pagepeople, setPagepeople] = useState(1);

  const searchRef = useRef(null);

  const getResults = async () => {
    setloading(true);
    const resultsmovie = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&query=${query}&page=${pagemovie}`
    );
    setmovieresults(resultsmovie?.data);
    const resultsTV = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&query=${query}&page=${pagetv}`
    );
    settvresults(resultsTV?.data);
    const resultsPeople = await axios.get(
      `https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&query=${query}&page=${pagepeople}`
    );
    setpeopleresults(resultsPeople?.data);
    setloading(false);
    console.log("movies", resultsmovie);
    console.log("tv", resultsTV);
    console.log("people", resultsPeople);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPagemovie(1);
    setPagepeople(1);
    setPagetv(1);
    getResults();
  };
  useEffect(() => {
    getResults();
  }, [pagepeople, pagemovie, pagetv]);
  return (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit}>
        {searchRef?.current?.focus()}
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for movie, tvshow or person..."
          ref={searchRef}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>search</button>
      </form>

      <div className={styles.subcontainer}>
        <div className={styles.filters}>
          <h1>Search Results</h1>
          <ul>
            <li onClick={() => setfilter("movie")}>
              Movies <span>{movieResults?.total_results}</span>
            </li>
            <li onClick={() => setfilter("tv")}>
              Tv Shows <span>{tvResults?.total_results}</span>
            </li>
            <li onClick={() => setfilter("people")}>
              People <span>{peopleResults?.total_results}</span>
            </li>
          </ul>
        </div>

        <div className={styles.results}>
          {loading ? (
            <div className="loading">
              <Image
                src={"/loaderspinner.svg"}
                alt="loading"
                width={100}
                height={100}
              />
            </div>
          ) : loading == false ? (
            <FilteredResults
              filter={filter}
              setPagemovie={setPagemovie}
              setPagepeople={setPagepeople}
              setPagetv={setPagetv}
              movies={movieResults}
              tv={tvResults}
              people={peopleResults}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

const FilteredResults = ({
  filter,
  setPagemovie,
  setPagepeople,
  setPagetv,
  movies,
  tv,
  people,
}) => {
  return filter == "movie" ? (
    <MovieResults setPage={setPagemovie} movies={movies} />
  ) : filter == "tv" ? (
    <TvResults setPage={setPagetv} tv={tv} />
  ) : filter == "people" ? (
    <PeopleResults setPage={setPagepeople} people={people} />
  ) : (
    <></>
  );
};

const MovieResults = ({ setPage, movies }) => {
  return (
    <div className={styles.themovies}>
      <div>
        {movies.results.map((m, i) => (
          <Link href={`/movies/${m.id}`} key={m.id} className={styles.result}>
            <Image
              src={
                m?.poster_path
                  ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${m.poster_path}`
                  : "/placeholderImage.png"
              }
              alt={m.original_title}
              width={1000}
              height={1000}
            />
            <div>
              <h3>{m.title}</h3>
              <span>
                {new Date(m.release_date).toLocaleDateString("en", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <p>{m.overview}</p>
            </div>
          </Link>
        ))}
      </div>
      <Custompagination setPage={setPage} numberofpages={movies.total_pages} />
    </div>
  );
};
const TvResults = ({ setPage, tv }) => {
  return (
    <div className={styles.themovies}>
      {tv.results.map((m, i) => (
        <Link href={`/tvshows/${m.id}`} key={m.id} className={styles.result}>
          <Image
            src={
              m?.poster_path
                ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${m.poster_path}`
                : "/placeholderImage.png"
            }
            alt={m.original_name}
            width={1000}
            height={1000}
          />
          <div>
            <h3>{m.name}</h3>
            <span>
              {new Date(m.first_air_date).toLocaleDateString("en", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <p>{m.overview}</p>
          </div>
        </Link>
      ))}
      <Custompagination setPage={setPage} numberofpages={tv.total_pages} />
    </div>
  );
};
const PeopleResults = ({ setPage, people }) => {
  return (
    <div className={styles.themovies}>
      {people?.results.map((p, _i) => (
        <Link href={`/people/${p.id}`} key={p.id} className={styles.person}>
          <Image
            src={
              p.profile_path
                ? `https://www.themoviedb.org/t/p/w180_and_h180_face${p.profile_path}`
                : `/placeholder.png`
            }
            alt="image"
            width={1000}
            height={1000}
          />
          <div>
            <h3>{p.name}</h3>
            <p>
              {p.known_for_department} -{" "}
              {p?.known_for.map((p, i) => p.title + ",")}
            </p>
          </div>
        </Link>
      ))}
      <Custompagination setPage={setPage} numberofpages={people.total_pages} />
    </div>
  );
};

export default Page;
