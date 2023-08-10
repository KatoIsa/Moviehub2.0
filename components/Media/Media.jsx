import styles from "./Media.module.scss";
import Image from "next/image";
import Link from "next/link";

const Media = ({ images, amount, videos }) => {
  return (
    <div className={styles.container}>
      <h2>Media</h2>
      <div className={styles.images}>
        <section className={styles.posters}>
          <h4>
            Posters <span>{images?.posters?.length}</span>
          </h4>
          <div className={styles.overflowcontainer}>
            {images?.posters
              .filter((p, i) => i < amount)
              .map((poster, i) => (
                <Link
                  href={`https://www.themoviedb.org/t/p/original${poster.file_path}`}
                  key={i}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={`https://www.themoviedb.org/t/p/original${poster.file_path}`}
                    height={1000}
                    width={1000}
                    alt="image"
                  />
                </Link>
              ))}
          </div>
        </section>
        <section className={styles.backdrops}>
          <h4>
            Backdrops <span>{images?.backdrops.length}</span>
          </h4>
          <div className={styles.overflowcontainer}>
            {images?.backdrops
              .filter((p, i) => i < amount)
              .map((poster, i) => (
                <Link
                  href={`https://www.themoviedb.org/t/p/original${poster.file_path}`}
                  key={i}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={`https://www.themoviedb.org/t/p/original${poster.file_path}`}
                    height={1000}
                    width={1000}
                    alt="image"
                  />
                </Link>
              ))}
          </div>
        </section>
        <section className={styles.videos}>
          <h4>
            Videos <span>{videos.length}</span>
          </h4>
          <div className={styles.overflowcontainer}>
            {videos
              ?.filter((_v, i) => i < amount)
              ?.map((v) => (
                <div key={v.key} className={styles.video}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.key}`}
                    frameBorder="0"
                    title="trailer player"
                    allowFullScreen
                  />
                  <span>
                    <p>
                      {v.type} - {v.name}
                    </p>
                  </span>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Media;
