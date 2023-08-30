"use client";
import { useState, useEffect } from "react";
import styles from "./Iframe.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Iframe = ({ open, movieid, handleclose, type }) => {
  const [trailers, setTrailers] = useState([]);
  const fetchTrailer = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movieid}/videos?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&page=1`
    );
    setTrailers(data.results);
  };
  const trailer = trailers.filter((item) => item.type == "Trailer")[0];
  useEffect(() => {
    fetchTrailer();
  }, [movieid]);
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${
          trailer?.key || trailers[0]?.key
        }`}
        width="500"
        height="300"
        title="trailer player"
        allowFullScreen
      />
      <div className={styles.svg} onClick={handleclose}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Iframe;
