import styles from "./Subnav.module.scss";
import Link from "next/link";

const Subnav = ({ mediatype, id }) => {
  return (
    <div className={styles.heading}>
      <Link href={`/${mediatype}/${id}`}>
        <h2>Overview</h2>
      </Link>
      <Link href={`/${mediatype}/${id}/media`}>
        <h2>Media</h2>
      </Link>
      <Link href={`/${mediatype}/${id}/reviews`}>
        <h2>Reviews</h2>
      </Link>
      <Link href={`media`}>
        <h2>Full Cast and Crew</h2>
      </Link>
    </div>
  );
};

export default Subnav;
