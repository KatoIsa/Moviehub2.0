"use client";
import { useState, useEffect } from "react";
import styles from "./Media.module.scss";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Page = ({ params: { slug } }) => {
  const [details, setDetails] = useState();
  const [loading, setloading] = useState(true);
  const [images, setimages] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${slug}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setDetails(data);
    const theimages = await axios.get(
      `https://api.themoviedb.org/3/person/${slug}/images?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
    );
    setimages(theimages.data.profiles);
    console.log(images);
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
      <div className={styles.heading}>
        <Link href={`/people/${slug}`}>
          <h2>Overview</h2>
        </Link>
        <Link href={`/people/${slug}/media`}>
          <h2>Media</h2>
        </Link>
      </div>
      <Link href={`/people/${slug}`} className={styles.moviedetails}>
        <Image
          src={`https://www.themoviedb.org/t/p/original${details?.profile_path}`}
          width={1000}
          height={1000}
          alt="image"
        />
        <div className={styles.subnav}>
          <h1>{details?.name}</h1>
          <p>&larr; Back to main.</p>
        </div>
      </Link>

      <div className={styles.subcontainer}>
        <div className={styles.side}>
          <h4>
            Profiles <span>{images.length}</span>
          </h4>
        </div>
        <div className={styles.images}>
          {images?.map((image, i) => (
            <Link
              href={`https://www.themoviedb.org/t/p/original${image?.file_path}`}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <Image
                src={`https://www.themoviedb.org/t/p/original${image?.file_path}`}
                alt="images"
                width={1000}
                height={1000}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
