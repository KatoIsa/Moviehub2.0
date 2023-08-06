import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.txt}>
        <h1>Welcome.</h1>
        <h2>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <form action="">
          <input
            type="text"
            placeholder="search for a movie, tv show, person..."
          />
          <button type="submit">search</button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
