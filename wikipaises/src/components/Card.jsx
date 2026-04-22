import { useNavigate } from 'react-router-dom'
import styles from './Card.module.css'

function getBadgeClass(region) {
  const map = {
    Europe: 'badge-europe',
    Americas: 'badge-americas',
    Asia: 'badge-asia',
    Africa: 'badge-africa',
    Oceania: 'badge-oceania',
  }
  return map[region] || 'badge-default'
}

function formatPop(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

function Card({ country, index }) {
  const navigate = useNavigate()
  const name = country.name?.common || '—'
  const capital = country.capital?.[0] || '—'
  const region = country.region || '—'
  const population = country.population ?? 0
  const flag = country.flags?.svg || country.flags?.png || ''
  const code = country.cca3

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => navigate(`/country/${code}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/country/${code}`)}
    >
      <div className={styles.flagWrap}>
        <img
          src={flag}
          alt={`Bandeira de ${name}`}
          className={styles.flag}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.name}>{name}</h3>
          <span className={`${styles.badge} ${getBadgeClass(region)}`}>
            {region.toUpperCase()}
          </span>
        </div>

        <p className={styles.capital}>
          <span className={styles.pin}>📍</span>
          {capital}
        </p>

        <p className={styles.pop}>
          <span className={styles.popIcon}>👥</span>
          {formatPop(population)} RESIDENTS
        </p>
      </div>
    </article>
  )
}

export default Card
