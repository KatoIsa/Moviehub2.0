"use client";
import { useState, useEffect } from "react";
import styles from "../../../movies/[slug]/media/Media.module.scss";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Subnav from "@/components/subnav/Subnav";

const Page = ({ params: { slug } }) => {
  const [media, setmedia] = useState([]);
  const [details, setdetails] = useState([]);
  const [mediatype, setmediatype] = useState("poster");
  const [Videos, setvideos] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setdetails(data);
    const images = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}/images?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setmedia(images?.data);
    const thevideos = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}/videos?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setvideos(thevideos?.data?.results);
    setloading(false);
  };

  useEffect(() => {
    fetchData();
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
    <div className={styles.container}>
      <Subnav mediatype={"tvshows"} id={slug} />
      <Link href={`/tvshows/${slug}`} className={styles.moviedetails}>
        <Image
          src={`https://www.themoviedb.org/t/p/original${details.poster_path}`}
          width={1000}
          height={1000}
          alt="image"
        />
        <div className={styles.subnav}>
          <h1>
            {details.name} ({new Date(details.first_air_date).getFullYear()})
          </h1>
          <p>&larr; Back to main.</p>
        </div>
      </Link>

      <div className={styles.mediacontainer}>
        <div className={styles.mediafilter}>
          <ul>
            <li
              onClick={() => {
                setmediatype("poster");
              }}
            >
              Poster <span>({media.posters?.length})</span>
            </li>
            <li
              onClick={() => {
                setmediatype("backdrop");
              }}
            >
              Backdrop <span>({media.backdrops?.length})</span>
            </li>
            <li
              onClick={() => {
                setmediatype("logo");
              }}
            >
              Logos <span>({media.logos?.length})</span>
            </li>
            <li
              onClick={() => {
                setmediatype("video");
              }}
            >
              Videos <span>({Videos?.length})</span>
            </li>
          </ul>
        </div>

        {mediatype == "poster" ? (
          <Posters media={media} />
        ) : mediatype == "backdrop" ? (
          <Backdrops media={media} />
        ) : mediatype == "logo" ? (
          <Logos media={media} />
        ) : (
          <Thevideos Videos={Videos} />
        )}
      </div>
    </div>
  );
};

const Posters = ({ media }) => {
  return (
    <div className={styles.images}>
      {media?.posters?.map((m, i) => (
        <div key={i} className={styles.poster}>
          <Link
            href={`https://www.themoviedb.org/t/p/original${m?.file_path}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={
                m.file_path
                  ? `https://www.themoviedb.org/t/p/original${m?.file_path}`
                  : "/placeholderImage.png"
              }
              width={1000}
              height={1000}
              alt="image"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

const Backdrops = ({ media }) => {
  return (
    <div className={styles.images}>
      {media.backdrops?.map((m, i) => (
        <div key={i} className={styles.backdrop}>
          <Link
            href={`https://www.themoviedb.org/t/p/original${m?.file_path}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={
                m.file_path
                  ? `https://www.themoviedb.org/t/p/original${m?.file_path}`
                  : "/placeholderImage.png"
              }
              width={1000}
              height={1000}
              alt="image"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

const Logos = ({ media }) => {
  return (
    <div className={styles.images}>
      {media?.logos?.map((m, i) => (
        <div key={i} className={styles.logo}>
          <Link
            href={`https://www.themoviedb.org/t/p/original${m?.file_path}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={
                m.file_path
                  ? `https://www.themoviedb.org/t/p/original${m?.file_path}`
                  : "/placeholderImage.png"
              }
              width={1000}
              height={1000}
              alt="image"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

const Thevideos = ({ Videos }) => {
  return (
    <div className={styles.images}>
      {Videos?.map((m, i) => (
        <div key={i} className={styles.video}>
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
        </div>
      ))}
    </div>
  );
};

export default Page;
