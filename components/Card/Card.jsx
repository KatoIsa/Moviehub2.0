import styles from "./Card.module.scss";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item, type }) => {
  const rating = (item.vote_average.toFixed(1) / 10) * 100;
  return (
    <Link href={"/"}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
            alt="img"
            width={1000}
            height={1000}
          />
        </div>
        <div
          className={styles.progress}
          style={{
            background: `radial-gradient(closest-side, rgba(0,0,0) 78%, transparent 95% 100%),conic-gradient(${
              rating >= 70
                ? "rgba( 1, 210, 119)"
                : rating >= 50
                ? "rgba(170, 255, 0)"
                : "rgba(212, 2, 66)"
            } ${rating}%, rgba(0, 0, 0, 0.5) 0)`,
          }}
        >
          {rating.toFixed(0)}%
        </div>
        <h4>{item.title || item.name}</h4>
        <p>
          {new Date(
            item.release_date || item.first_air_date
          ).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
};

export default Card;
