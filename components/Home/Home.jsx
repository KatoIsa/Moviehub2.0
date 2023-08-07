import styles from "./Home.module.scss";
import Card from "../Card/Card";

const Homepage = ({ title, movies, tv }) => {
  return (
    <section className={styles.container}>
      <div className={styles.div}>
        <h1>{title}</h1>
        <h2>Movies</h2>
        <div className={styles.movies}>
          {movies.map((item, i) => (
            <Card item={item} key={i} type={"movie"} />
          ))}
        </div>
        <h2>Tv Shows</h2>
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
