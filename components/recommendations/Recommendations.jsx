import styles from "./Recommendations.module.scss";
import Link from "next/link";
import Image from "next/image";

const Recommendations = ({ recommendation, name }) => {
  return (
    <div className={styles.container}>
      <h2>Recommendations</h2>
      {recommendation.length ? (
        <div className={styles.therecomms}>
          {recommendation.map((r) => (
            <Link
              href={
                r.media_type == "movie" ? `/movies/${r.id}` : `/tvshows/${r.id}`
              }
              key={r.id}
            >
              <div className={styles.image}>
                <Image
                  src={`https://www.themoviedb.org/t/p/original${r.backdrop_path}`}
                  width={1000}
                  height={1000}
                  alt="image"
                />
              </div>
              <span>
                <p>
                  {r.name?.length > 23 || r.title?.length > 23
                    ? r.name?.substring(0, 22) || r.title?.substring(0, 22)
                    : r.name || r.title}
                  {(r?.title?.length > 24 && "...") ||
                    (r?.name?.length > 24 && "...")}
                </p>{" "}
                <span>
                  {((r.vote_average / 10).toFixed(2) * 100).toFixed(0)}%
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.info}>
          Not yet enough data for suggestions based on {name}.
        </p>
      )}
    </div>
  );
};

export default Recommendations;
