import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

const CONTINENTS = ['Americas', 'Europe', 'Asia', 'Africa', 'Oceania']

function Header({ activeRegion, onRegionChange, showBack = false }) {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {showBack && (
            <button className={styles.backBtn} onClick={() => navigate('/')}>
              ← Voltar para a lista
            </button>
          )}
          <Link to="/" className={styles.logo}>
            <em>WikiPaíses</em>
          </Link>
        </div>

        <nav className={styles.nav}>
          {CONTINENTS.map((c) => (
            <button
              key={c}
              className={`${styles.navItem} ${activeRegion === c ? styles.active : ''}`}
              onClick={() => onRegionChange?.(c === activeRegion ? '' : c)}
            >
              {c}
            </button>
          ))}
        </nav>

        <div className={styles.icons}>
          <span className={styles.icon} title="Idioma">🌐</span>
          <span className={styles.icon} title="Usuário">👤</span>
        </div>
      </div>
    </header>
  )
}

export default Header
