import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span>© 2026 Adeel Ali Yousaf · Drawn in Next.js, React &amp; a lot of coffee.</span>
        <a className={styles.backToTop} href="#home">
          ↑ Back to Cover
        </a>
      </div>
    </footer>
  );
}
