"use client";
import { useState, useEffect } from "react";
import styles from "./MovieDetails.module.scss";
import { BsLink } from "react-icons/bs";
import currencyFormatter from "currency-formatter";
import Image from "next/image";
import Link from "next/link";

const MovieDetails = ({ movieid, mediatype, details, cast }) => {
  const [lang, setlang] = useState();
  useEffect(() => {
    if (
      typeof details.original_language === "string" &&
      details.original_language?.length === 2
    ) {
      try {
        const displayNames = new Intl.DisplayNames(
          [details.original_language],
          {
            type: "language",
          }
        );
        const name = displayNames.of(details.original_language);
        setlang(name);
      } catch (error) {
        console.error("Error fetching language name:", error);
      }
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.actors}>
          <h2>Cast</h2>
          <div className={styles.cast}>
            {cast.cast
              ?.filter((c, i) => i < 10)
              .map((c, i) => (
                <div className={styles.actor} key={i}>
                  <Link
                    href={`${
                      c.profile_path
                        ? `https://www.themoviedb.org/t/p/original${c.profile_path}`
                        : "/placeholder.png"
                    }`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.image}
                  >
                    <Image
                      src={
                        c.profile_path
                          ? `https://www.themoviedb.org/t/p/w138_and_h175_face${c.profile_path}`
                          : "/placeholder.png"
                      }
                      alt={`${c.name}`}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                  <div className={styles.name}>
                    <h4>{c.name}</h4>
                    <p>{c.character}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <Link
          href={`${details.homepage}`}
          target="_blank"
          rel="noreferrer"
          className={styles.icons}
        >
          <BsLink />
        </Link>
        <div className={styles.info}>
          <div className={styles.status}>
            <h4>Status</h4>
            <p>{details.status}</p>
          </div>
          <div className={styles.language}>
            <h4>Original language</h4>
            <p>{lang || details.original_language}</p>
          </div>
          {mediatype == "tv" ? (
            <div className={styles.networks}>
              <h4>Networks</h4>
              {details?.networks?.map((network, i) => (
                <p key={i}>
                  <Link
                    href={`https://www.themoviedb.org/t/p/original${network.logo_path}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={`https://www.themoviedb.org/t/p/h30${network.logo_path}`}
                      alt="image"
                      width={1000}
                      height={1000}
                    />
                  </Link>{" "}
                </p>
              ))}
            </div>
          ) : (
            <div className={styles.budget}>
              <h4>Budget</h4>
              <p>
                ${currencyFormatter.format(details.budget, { code: "USC" })}
              </p>
            </div>
          )}
          {mediatype == "tv" ? (
            <div>
              <h4>Type</h4>
              <p>{details.type}</p>
            </div>
          ) : (
            <div className={styles.Revenue}>
              <h4>Revenue</h4>
              <p>
                ${currencyFormatter.format(details.revenue, { code: "USC" })}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
