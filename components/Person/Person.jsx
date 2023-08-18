import React from "react";
import styles from "./Person.module.scss";
import Image from "next/image";
import Link from "next/link";

const Person = ({ person }) => {
  const knownfor = `${person.known_for.map((k, i) => k?.title || k?.name)}`;
  return (
    <Link href={`/people/${person.id}`} className={styles.container}>
      <Image
        src={`https://www.themoviedb.org/t/p/w470_and_h470_face${person.profile_path}`}
        alt="image"
        width={1000}
        height={1000}
      />
      <div>
        <h4>{person.name}</h4>
        <p>
          {knownfor.length > 25 ? `${knownfor.substring(0, 25)}...` : knownfor}
        </p>
      </div>
    </Link>
  );
};

export default Person;
