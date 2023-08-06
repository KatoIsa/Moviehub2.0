"use client";
import { useState } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import { AiOutlineMenuFold } from "react-icons/ai";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.menu} onClick={() => setOpen(!open)}>
        <AiOutlineMenuFold />
      </div>
      <Link href={"/"}>
        <h1>
          MovieHub <div></div>
        </h1>
      </Link>
      <ul style={{ left: `${open ? "0" : "-100vw"}` }}>
        <Link href={"/"}>
          <li>Home</li>
        </Link>
        <Link href={"/"}>
          <li>Movies</li>
        </Link>
        <Link href={"/"}>
          <li>TV Shows</li>
        </Link>
        <Link href={"/"}>
          <li>People</li>
        </Link>
      </ul>
      <div className={styles.icon}>
        <Link href={"/"}>
          <BsSearch />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
