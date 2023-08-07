"use client";
import { useState, useEffect } from "react";
import styles from "./Iframe.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Iframe = ({ open, movieid, handleclose }) => {
  const [trailers, setTrailers] = useState([]);
  const fetchTrailer = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    setTrailers(data.results);
    console.log(trailers);
  };
  const trailer = trailers.filter((item) => item.type == "Trailer")[0];
  console.log("====================================");
  console.log(trailer);
  console.log("====================================");
  useEffect(() => {
    fetchTrailer();
  }, [movieid]);
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${trailer?.key}`}
        width="500"
        height="300"
        frameBorder="0"
        title="trailer player"
        allowFullScreen
      />
      {/* <div className={styles.iframe}></div> */}
      <div className={styles.svg} onClick={handleclose}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Iframe;