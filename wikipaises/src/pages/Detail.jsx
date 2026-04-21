import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCountryByCode } from '../services/api'
import Header from '../components/Header'
import InfoBlock from '../components/InfoBlock'
import Footer from '../components/Footer'
import styles from './Detail.module.css'

const DESCRIPTIONS = {
  BRA: {
    title: 'The Heart of South America',
    text: 'Brazil is the largest country in both South America and Latin America. At 8.5 million square kilometers and with over 214 million people, it is the world\'s fifth-largest country by area and the seventh most populous. Its rich biodiversity is headlined by the Amazon River basin, which includes a vast tropical forest, home to diverse wildlife, a variety of ecological systems, and extensive natural resources.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/800px-Christ_the_Redeemer_-_Cristo_Redentor.jpg',
  },
  USA: {
    title: 'Land of Opportunity',
    text: 'The United States of America is a federal republic composed of 50 states. It is the world\'s largest economy and a global leader in science, technology, and culture. From the Rocky Mountains to the Great Plains, its diverse landscapes reflect the richness of its multicultural society.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/2007_01_28_Niagara_Falls.jpg/800px-2007_01_28_Niagara_Falls.jpg',
  },
}

function getDescription(cca3) {
  return DESCRIPTIONS[cca3] || {
    title: 'A Sovereign Nation',
    text: 'This country has a rich history, diverse culture, and unique geography that make it a fascinating part of our global atlas. Its people, traditions, and landscapes contribute to the vibrant tapestry of the world community.',
    img: null,
  }
}

function formatPop(n) {
  return n?.toLocaleString('pt-BR') ?? '—'
}

function formatArea(n) {
  return n ? n.toLocaleString('pt-BR') + ' km²' : '—'
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
      <p style={{ fontFamily: 'DM Mono, monospace', color: 'var(--ink-muted)', letterSpacing: '0.1em' }}>
        CARREGANDO...
      </p>
    </div>
  )
}

function ErrorScreen({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'var(--cream)' }}>
      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem' }}>País não encontrado.</p>
      <button onClick={onBack} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '0.08em', cursor: 'pointer', background: 'none', border: 'none' }}>
        ← Voltar para a lista
      </button>
    </div>
  )
}

function Detail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getCountryByCode(code)
      .then((res) => {
        setCountry(Array.isArray(res.data) ? res.data[0] : res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [code])

  if (loading) return <LoadingScreen />
  if (error || !country) return <ErrorScreen onBack={() => navigate('/')} />

  const name = country.name?.common || '—'
  const official = country.name?.official || '—'
  const capital = country.capital?.[0] || '—'
  const region = country.region || '—'
  const subregion = country.subregion || '—'
  const area = formatArea(country.area)
  const population = formatPop(country.population)
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : '—'
  const currencyObj = country.currencies
    ? Object.values(country.currencies)[0]
    : null
  const currency = currencyObj
    ? `${currencyObj.name} - ${Object.keys(country.currencies)[0]} - ${currencyObj.symbol || '—'}`
    : '—'
  const flag = country.flags?.svg || country.flags?.png || ''
  const desc = getDescription(code)

  return (
    <div className={styles.page}>
      <Header showBack activeRegion={region} />

      <main className={styles.main}>
        <div className="container">

          <div className={styles.flagWrap}>
            <img src={flag} alt={`Bandeira de ${name}`} className={styles.flag} />
          </div>

          <div className={styles.titleSection}>
            <h1 className={styles.officialName}>{official}</h1>
            <p className={styles.commonName}>{name}</p>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoCol}>
              <InfoBlock icon="🏛️" label="Capital"    value={capital}    />
              <InfoBlock icon="🌍" label="Continent"  value={region}     />
              <InfoBlock icon="🧭" label="Sub-Region" value={subregion}  />
              <InfoBlock icon="📐" label="Area"       value={area}       />
            </div>
            <div className={styles.infoCol}>
              <InfoBlock icon="👥" label="Population"   value={population} />
              <InfoBlock icon="🗣️" label="Languages"    value={languages}  />
              <InfoBlock icon="💰" label="Currency"     value={currency}   />
              <InfoBlock icon="🏷️" label="Country Code" value={code}       />
            </div>
          </div>

          <div className={`${styles.descSection} ${!desc.img ? styles.descSectionNoImg : ''}`}>
            {desc.img && (
              <div className={styles.descImgWrap}>
                <img src={desc.img} alt={name} className={styles.descImg} />
              </div>
            )}
            <div className={styles.descText}>
              <h2 className={styles.descTitle}>{desc.title}</h2>
              <p className={styles.descBody}>{desc.text}</p>
              <button className={styles.discoverBtn} onClick={() => navigate('/')}>
                DISCOVER MORE →
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Detail
