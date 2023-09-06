import styles from "./Home.module.scss";
import Card from "../Card/Card";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

const Homepage = ({ title, movies, tv }) => {
  return (
    <section className={styles.container}>
      <div className={styles.div}>
        <strong>
          <h1>{title}</h1>
        </strong>
        <strong>
          <h2>
            Movies{" "}
            <Link href="/movies">
              <BsArrowRight />
            </Link>
          </h2>
        </strong>
        <div className={styles.movies}>
          {movies.map((item, i) => (
            <Card item={item} key={i} type={"movie"} />
          ))}
        </div>
        <strong>
          <h2>
            Tv Shows{" "}
            <Link href="/tvshows">
              <BsArrowRight />
            </Link>
          </h2>
        </strong>
        <div className={styles.tv}>
          {tv.map((item, i) => (
            <Card item={item} type={"tv"} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
