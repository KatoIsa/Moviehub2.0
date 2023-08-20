"use client";
import { useState, useEffect } from "react";
import styles from "./People.module.scss";
import Person from "@/components/Person/Person";
import axios from "axios";
import Custompagination from "@/components/CustomPagination/CustomPagination";

const Page = () => {
  const [thepeople, setthepeople] = useState([]);
  const [page, setPage] = useState();
  const [numberofpages, setNumberofpages] = useState();
  const fetchdata = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&language=en-US&page=${page}`
    );
    setthepeople(data.results);
    setNumberofpages(data.total_pages);
  };
  useEffect(() => {
    fetchdata();
  }, [page]);
  return (
    <div className={styles.container}>
      <h2>Popular people</h2>
      <div className={styles.peoplecontainer}>
        {thepeople.map((p, _i) => (
          <Person key={p.id} person={p} />
        ))}
      </div>
      <Custompagination setPage={setPage} numberofpages={numberofpages} />
    </div>
  );
};

export default Page;
