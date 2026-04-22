import { useCountries } from '../hooks/useCountries'
import Header from '../components/Header'
import Card from '../components/Card'
import Footer from '../components/Footer'
import styles from './Home.module.css'

function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={`skeleton ${styles.skeletonFlag}`} />
      <div className={styles.skeletonBody}>
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '60%' }} />
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '40%', height: '10px' }} />
        <div className={`skeleton ${styles.skeletonLine}`} style={{ width: '50%', height: '10px' }} />
      </div>
    </div>
  )
}

function Home() {
  const {
    countries, loading, error,
    search, setSearch,
    region, setRegion,
    page, setPage, totalPages,
  } = useCountries()

  return (
    <div className={styles.page}>
      <Header activeRegion={region} onRegionChange={setRegion} />

      <main>
        <section className={styles.hero}>
          <div className="container">
            <p className={styles.heroEyebrow}>Atlas Digital</p>
            <h1 className={styles.heroTitle}>Explore the Atlas</h1>
            <p className={styles.heroSub}>A CURATED DIGITAL ARCHIVE OF SOVEREIGN NATIONS AND CULTURES.</p>
          </div>
        </section>

        <section className={styles.controls}>
          <div className={`container ${styles.controlsInner}`}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Search by nation, capital, language, or currency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterWrap}>
              <span className={styles.filterIcon}>🌍</span>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={styles.select}
              >
                <option value="">All Continents</option>
                <option value="Americas">Americas</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className="container">
            {error && (
              <div className={styles.error}>
                <p>⚠️ Erro ao carregar países: {error}</p>
              </div>
            )}

            {!error && (
              <div className={styles.grid}>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                  : countries.length === 0
                  ? (
                    <div className={styles.empty}>
                      <p>Nenhum país encontrado.</p>
                    </div>
                  )
                  : countries.map((country, i) => (
                    <Card key={country.cca3} country={country} index={i} />
                  ))
                }
              </div>
            )}

            {!loading && !error && countries.length > 0 && (
              <div className={styles.pagination}>
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← PREVIOUS
                </button>
                <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
                <button
                  className={styles.pageBtn}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  NEXT →
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
