import styles from "./Footer.module.scss";
import { AiOutlineHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <h1>
        MovieHub <div></div>
      </h1>
      <p>
        2023. All data and media from{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          TMDB
        </a>
        .
      </p>
      <p>
        Made with <AiOutlineHeart /> by{" "}
        <a
          href="https://taleem-mankuer.web.app"
          target="_blank"
          rel="noreferrer"
        >
          Taleem
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
