"use client";
import { useState, useEffect } from "react";
import styles from "./Person.module.scss";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Page = ({ params: { slug } }) => {
  const [details, setDetails] = useState();
  const [credits, setCredits] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    const tvcredits = await axios.get(
      `https://api.themoviedb.org/3/person/${slug}/combined_credits?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setCredits(tvcredits.data.cast);

    setDetails(data);

    console.log(credits);
    console.log(credits.length);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Link href={`/people/${slug}`}>
          <h2>Overview</h2>
        </Link>
        <Link href={`/people/${slug}/media`}>
          <h2>Media</h2>
        </Link>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.info}>
          <Link
            href={`${
              details?.profile_path
                ? `https://www.themoviedb.org/t/p/original${details?.profile_path}`
                : "/placeholder.png"
            }`}
            target="_blank"
            rel="noreferrer"
            className={styles.image}
          >
            <Image
              src={`${
                details?.profile_path
                  ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${details.profile_path}`
                  : "/placeholder.png"
              }`}
              alt="image"
              width={1000}
              height={1000}
            />
          </Link>
          <h3>Personal Info</h3>
          <div>
            <h4>Known For</h4>
            <p>{details?.known_for_department}</p>
          </div>
          <div>
            <h4>Known Credits</h4>
            <p>{credits.length}</p>
          </div>
          <div>
            <h4>Birthday</h4>
            <p>
              {details?.birthday} (
              {new Date().getFullYear() -
                new Date(details?.birthday).getFullYear()}{" "}
              years old)
            </p>
          </div>
          <div>
            <h4>Gender</h4>
            <p>
              {details?.gender == 1
                ? "Female"
                : details?.gender == 2
                ? "Male"
                : details?.gender == 3
                ? "Non-binary"
                : "Not specified"}
            </p>
          </div>
          <div>
            <h4>Place of birth</h4>
            <p>{details?.place_of_birth}</p>
          </div>
          <div>
            <h4>Also Known As</h4>
            {details?.also_known_as.map((a, i) => (
              <p key={i}>{a}</p>
            ))}
          </div>
        </div>

        <div className={styles.info1}>
          <h1>{details?.name}</h1>
          <div className={styles.bio}>
            <h4>Biography</h4>
            <p>{details?.biography}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
