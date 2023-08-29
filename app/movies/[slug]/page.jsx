"use client";
import { useState, useEffect } from "react";
import Iframe from "@/components/Iframe/Iframe";
import axios from "axios";
import styles from "./Movie.module.scss";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import Subnav from "@/components/subnav/Subnav";

const Page = ({ params: { slug } }) => {
  const [open, setopen] = useState(false);
  const [details, setdetails] = useState({});
  const [writersandDirectors, setwritersandDirectors] = useState([]);
  const [castmembers, setcastmembers] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchMovieDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setdetails(data);

    const cast = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}/credits?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    const writersndirectors = cast.data?.crew.filter(
      (item) =>
        item.known_for_department == "Writing" ||
        item.known_for_department == "Directing"
    );
    setcastmembers(cast.data);
    setwritersandDirectors(writersndirectors.filter((w, i) => i < 9));
    setloading(false);
  };
  useEffect(() => {
    fetchMovieDetails();
  }, []);
  const handleopen = () => {
    setopen(true);
  };
  const handleclose = () => {
    setopen(false);
  };
  const rating = (details.vote_average?.toFixed(1) / 10) * 100;
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
      {open && (
        <Iframe
          open={open}
          handleclose={handleclose}
          movieid={slug}
          type={"movie"}
        />
      )}
      <Subnav mediatype={"movies"} id={details.id} />
      <div
        className={styles.header}
        style={{
          backgroundImage: `linear-gradient( to right, rgba(var(--DarkBlue), 0.9) 0%, rgba(var(--DarkBlue), 0.9) ), url("https://www.themoviedb.org/t/p/original${details.backdrop_path}")`,
        }}
      >
        <Link
          href={`https://www.themoviedb.org/t/p/original${details.poster_path}`}
          target="_blank"
          rel="norefferer"
          className={styles.image}
        >
          <Image
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details.poster_path}`}
            width={1000}
            height={1000}
            alt="image"
          />
        </Link>
        <div className={styles.mobilegradient}>
          <Image
            src={`https://www.themoviedb.org/t/p/original${details.backdrop_path}`}
            width={1000}
            height={1000}
            className={styles.background}
            alt="image"
          />
          <div className={styles.backgroundgradient}></div>
        </div>
        <div className={styles.info}>
          <div>
            <h1>
              {details.title}({new Date(details.release_date).getFullYear()})
            </h1>
            <span>
              <p>{details.release_date}</p> <div></div>
              {details.genres?.map((genre, _i) => (
                <p key={genre.id}>{genre.name},</p>
              ))}
              <div></div>{" "}
              <p>
                {Math.floor(details.runtime / 60)}h{" "}
                {Math.round(
                  (details.runtime / 60 - Math.floor(details.runtime / 60)) * 60
                )}
                m
              </p>
            </span>
          </div>
          <div className={styles.trailer}>
            <div
              className={styles.progress}
              style={{
                background: `radial-gradient(closest-side, rgba(0,0,0) 78%, transparent 95% 100%),conic-gradient(${
                  rating >= 70
                    ? "rgba( 1, 210, 119)"
                    : rating >= 50
                    ? "rgba(170, 255, 0)"
                    : "rgba(212, 2, 66)"
                } ${rating}%, rgba(0, 0, 0, 0.6) 0)`,
              }}
            >
              {rating.toFixed(0)}%
            </div>
            <h3>
              User <br /> Score
            </h3>
            <h4 onClick={handleopen}>
              <FaPlay /> Play Trailer
            </h4>
          </div>
          <h3 className={styles.tagline}>{details.tagline}</h3>
          <div className={styles.overview}>
            <h3>Overview</h3>
            <p>{details.overview}</p>
          </div>
          <div className={styles.writer}>
            {writersandDirectors.map((writer, i) => (
              <section key={i}>
                <h3>{writer?.name}</h3>
                <p>{writer?.job}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
      <MovieDetails
        movieid={slug}
        mediatype="movie"
        cast={castmembers}
        details={details}
        name={details.title}
      />
    </div>
  );
};

export default Page;
