import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.logo}>WikiPaíses</p>
          <p className={styles.tagline}>© 2024 WIKIPAÍSES. THE DIGITAL CURATOR. ALL RIGHTS RESERVED.</p>
        </div>
        <nav className={styles.links}>
          <a href="#">About the Atlas</a>
          <a href="#">Methodology</a>
          <a href="#">Data Sources</a>
          <a href="#">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
