"use client";
import { useState, useEffect } from "react";
import styles from "./Cast.module.scss";
import Subnav from "@/components/subnav/Subnav";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Page = ({ params: { slug } }) => {
  const [cast, setcast] = useState([]);
  const [crew, setcrew] = useState([]);
  const [details, setdetails] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setdetails(data);
    const credits = await axios.get(`
https://api.themoviedb.org/3/movie/${slug}/credits?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`);
    setcrew(credits.data?.crew);
    setcast(credits.data?.cast);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <Subnav mediatype={"movies"} id={slug} />
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
      <div className={styles.credits}>
        <div className={styles.cast}>
          <h3>
            Cast <span>{cast.length}</span>
          </h3>
          <div className={styles.thecast}>
            {cast.length ? (
              cast.map((c, i) => (
                <Link href={`/people/${c.id}`} key={i}>
                  <Image
                    src={
                      c.profile_path
                        ? `https://www.themoviedb.org/t/p/original${c.profile_path}`
                        : "/placeholder.png"
                    }
                    alt={c.name}
                    width={1000}
                    height={1000}
                  />
                  <section>
                    <h4>{c.name}</h4> <p>{c.character}</p>
                  </section>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.crew}>
          <h3>
            Crew <span>{crew.length}</span>
            <div className={styles.thecast}>
              {crew.length ? (
                crew.map((c, i) => (
                  <Link href={`/people/${c.id}`} key={i}>
                    <Image
                      src={
                        c.profile_path
                          ? `https://www.themoviedb.org/t/p/original${c.profile_path}`
                          : "/placeholder.png"
                      }
                      alt={c.name}
                      width={1000}
                      height={1000}
                    />
                    <section>
                      <h4>{c.name}</h4>{" "}
                      <p>
                        {c.known_for_department} - {c.job}
                      </p>
                    </section>
                  </Link>
                ))
              ) : (
                <></>
              )}
            </div>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
