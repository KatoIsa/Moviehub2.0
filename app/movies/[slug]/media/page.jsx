"use client";
import { useState, useEffect } from "react";
import styles from "./Media.module.scss";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

const Page = ({ params: { slug } }) => {
  const [media, setmedia] = useState([]);
  const [details, setdetails] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [mediatype, setmediatype] = useState();
  const [Videos, setvideos] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setdetails(data);
    const images = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}/images?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setmedia(images?.data);
    const thevideos = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}/videos?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setvideos(thevideos?.data?.results);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Link href={`/movies/${slug}`}>
          <h2>Overview</h2>
        </Link>
        <Link href={`/movies/${slug}/media`}>
          <h2>Media</h2>
        </Link>
        <Link href={`media`}>
          <h2>Reviews</h2>
        </Link>
        <Link href={`media`}>
          <h2>Full Cast and Crew</h2>
        </Link>
      </div>
      <Link href={`/movies/${slug}`} className={styles.moviedetails}>
        <Image
          src={`https://www.themoviedb.org/t/p/original/${details.poster_path}`}
          width={1000}
          height={1000}
          alt="image"
        />
        <div className={styles.subnav}>
          <h1>
            {details.title} ({new Date(details.release_date).getFullYear()})
          </h1>
          <p>&larr; Back to main.</p>
        </div>
      </Link>

      <div className={styles.mediacontainer}>
        {console.log("filtered media", filteredMedia)}
        {console.log("media", mediatype)}
        <div className={styles.mediafilter}>
          <ul>
            <li
              onClick={() => {
                setFilteredMedia(media.posters);
                setmediatype("poster");
              }}
            >
              Poster <span>({media.posters?.length})</span>
            </li>
            <li
              onClick={() => {
                setFilteredMedia(media.backdrops);
                setmediatype("backdrop");
              }}
            >
              Backdrop <span>({media.backdrops?.length})</span>
            </li>
            <li
              onClick={() => {
                setFilteredMedia(media.logos);
                setmediatype("logo");
              }}
            >
              Logos <span>({media.logos?.length})</span>
            </li>
            <li
              onClick={() => {
                setFilteredMedia(Videos);
                setmediatype("video");
              }}
            >
              Videos <span>({Videos?.length})</span>
            </li>
          </ul>
        </div>
        <div className={styles.images}>
          {filteredMedia?.map((m, i) => (
            <div
              key={i}
              className={
                mediatype == "poster"
                  ? styles.poster
                  : mediatype == "backdrop"
                  ? styles.backdrop
                  : mediatype == "logo"
                  ? styles.logo
                  : styles.video
              }
            >
              {mediatype == "video" ? (
                <>
                  <iframe
                    src={`https://www.youtube.com/embed/${m.key}`}
                    frameBorder="0"
                    title="trailer player"
                    allowFullScreen
                  />
                  <span>
                    <p>
                      {m.type} - {m.name}
                    </p>
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href={`https://www.themoviedb.org/t/p/original${m?.file_path}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={`https://www.themoviedb.org/t/p/original${m?.file_path}`}
                      width={1000}
                      height={1000}
                      alt="image"
                    />
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
