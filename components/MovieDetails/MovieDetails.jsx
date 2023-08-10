"use client";
import { useState, useEffect } from "react";
import styles from "./MovieDetails.module.scss";
import { BsLink } from "react-icons/bs";
import currencyFormatter from "currency-formatter";
import Image from "next/image";
import Link from "next/link";
import Media from "../Media/Media";
import Recommendations from "../recommendations/Recommendations";
import axios from "axios";

const MovieDetails = ({ movieid, mediatype, details, cast, name }) => {
  const [lang, setlang] = useState();
  const [reviews, setReviews] = useState([]);
  const [substringit, setsubstringit] = useState(true);
  const [images, setimages] = useState();
  const [videos, setvideos] = useState([]);
  const [recommendation, setrecommendation] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${movieid}/reviews?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setReviews(data.results);
    const images = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${movieid}/images?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setimages(images.data);
    const thevideos = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${movieid}/videos?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    setvideos(thevideos.data.results);

    const therecommendations = await axios.get(
      `https://api.themoviedb.org/3/${mediatype}/${movieid}/recommendations?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setrecommendation(therecommendations.data.results);
  };
  useEffect(() => {
    fetchData();
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
  const singleReview = reviews[0];
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
        <div className={styles.social}>
          <h2>Social</h2>
          <div className={styles.reviewcontainer}>
            <h4>Reviews</h4>
            {reviews.length ? (
              <div className={styles.review}>
                <div className={styles.author}>
                  <Image
                    src={
                      singleReview?.author_details.avatar_path
                        ? `https://www.themoviedb.org/t/p/original${singleReview.author_details.avatar_path}`
                        : `/placeholder.png`
                    }
                    alt="image"
                    width={1000}
                    height={1000}
                  />
                  <span>
                    <h3>A review by {singleReview?.author}.</h3>
                    <p>
                      Written on{" "}
                      {new Date(singleReview?.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </span>
                </div>
                <pre>
                  <p>
                    {(singleReview?.content.length > 600) & substringit
                      ? singleReview?.content.substring(0, 600)
                      : singleReview?.content}
                    {substringit & (singleReview?.content.length > 600) ? (
                      <span onClick={() => setsubstringit(false)}>
                        ...read the rest.
                      </span>
                    ) : (substringit == false) &
                      (singleReview?.content.length > 600) ? (
                      <span onClick={() => setsubstringit(true)}>
                        show less
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                </pre>
              </div>
            ) : (
              <div>
                <h1>No Reviews currently</h1>
              </div>
            )}
            {reviews.length ? (
              <h4 className={styles.all}>Read All Reviews.</h4>
            ) : (
              <></>
            )}
          </div>
        </div>
        <Media images={images} amount={10} videos={videos} />
        <Recommendations recommendation={recommendation} name={name} />
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
