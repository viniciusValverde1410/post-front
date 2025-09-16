import Link from "next/link"
import styles from "./page.module.css"

export default function Home(){
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CRUD completo</h1>
      <nav className={styles.nav}>
        <Link href="/get" className={styles.link}>GET</Link> <br />
        <Link href="/post" className={styles.link}>POST</Link> <br />
        <Link href="/put" className={styles.link}>PUT</Link> <br />
        <Link href="/delete" className={styles.link}>DELETE</Link> <br />
      </nav>
    </div>
  )
}