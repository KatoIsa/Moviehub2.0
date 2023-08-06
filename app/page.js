import styles from "./page.module.scss";
import Hero from "@/components/Hero/Hero";
import Homepage from "@/components/Home/Home";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Homepage />
    </main>
  );
}
