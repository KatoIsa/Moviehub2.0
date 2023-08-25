"use client";
import { useState, useEffect } from "react";
import styles from "../../../movies/[slug]/reviews/Reviews.module.scss";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Subnav from "@/components/subnav/Subnav";

const Page = ({ params: { slug } }) => {
  const [details, setdetails] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [substringit, setsubstringit] = useState(true);
  const [loading, setloading] = useState(true);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setdetails(data);

    const reviews = await axios.get(
      `https://api.themoviedb.org/3/tv/${slug}/reviews?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setReviews(reviews?.data?.results);
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
      <Link href={`/movies/${slug}`} className={styles.moviedetails}>
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
      <div className={styles.social}>
        <div className={styles.number}>
          <h2>
            {Reviews.length} {Reviews.length == 1 ? "review" : "reviews"}
          </h2>
        </div>
        <div className={styles.reviewcontainer}>
          {Reviews.length ? (
            Reviews.map((r, i) => (
              <div className={styles.review} key={i}>
                <div className={styles.author}>
                  <Image
                    src={
                      r?.author_details.avatar_path
                        ? `https://www.themoviedb.org/t/p/original${r.author_details.avatar_path}`
                        : `/placeholder.png`
                    }
                    alt="image"
                    width={1000}
                    height={1000}
                  />
                  <span>
                    <h3>A review by {r?.author}.</h3>
                    <p>
                      Written on{" "}
                      {new Date(r?.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </span>
                </div>
                <pre>
                  <p>
                    {(r?.content.length > 600) & substringit
                      ? r?.content.substring(0, 600)
                      : r?.content}
                    {substringit & (r?.content.length > 600) ? (
                      <span onClick={() => setsubstringit(false)}>
                        ...read the rest.
                      </span>
                    ) : (substringit == false) & (r?.content.length > 600) ? (
                      <span onClick={() => setsubstringit(true)}>
                        show less
                      </span>
                    ) : (
                      <></>
                    )}
                  </p>
                </pre>
              </div>
            ))
          ) : (
            <div>
              <h1>No Reviews currently</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
