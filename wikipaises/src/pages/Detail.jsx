import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCountryByCode } from '../services/api'
import Header from '../components/Header'
import InfoBlock from '../components/InfoBlock'
import Footer from '../components/Footer'
import styles from './Detail.module.css'

const DESCRIPTIONS = {
  // Americas
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
  ARG: {
    title: 'Land of Silver and Tango',
    text: 'Argentina stretches from the subtropical north to the sub-Antarctic south, making it one of the most geographically diverse countries on Earth. Home to the Andes mountains, the vast Pampas plains, and Patagonia\'s dramatic landscapes, Argentina is also a cultural powerhouse known for tango, football, and some of the finest beef and wine in the world.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Andes_at_Aconcagua.jpg/800px-Andes_at_Aconcagua.jpg',
  },
  CAN: {
    title: 'The Great White North',
    text: 'Canada is the second-largest country in the world by total area, stretching from the Atlantic to the Pacific and northward into the Arctic Ocean. Known for its stunning natural landscapes — from the Rocky Mountains to Niagara Falls — Canada is also celebrated for its cultural diversity, bilingual heritage, and high quality of life.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Above_Clouds%21_%28334035sunshine%29.jpg/800px-Above_Clouds%21_%28334035sunshine%29.jpg',
  },
  MEX: {
    title: 'Where Ancient Civilizations Endure',
    text: 'Mexico is a country of extraordinary contrasts, where ancient Mayan and Aztec ruins stand alongside vibrant modern cities. It is the birthplace of corn, chocolate, and chili peppers, and its cuisine is recognized by UNESCO as an Intangible Cultural Heritage. From the beaches of Cancún to the deserts of Sonora, Mexico\'s geography is as diverse as its culture.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Chichen_itza_2.jpg/800px-Chichen_itza_2.jpg',
  },
  COL: {
    title: 'The Gateway to South America',
    text: 'Colombia is the only country in South America with coastlines on both the Pacific Ocean and the Caribbean Sea. Famous for its coffee, emeralds, and floral biodiversity, Colombia has transformed itself into one of Latin America\'s most dynamic nations. Its cities, from the vibrant Medellín to the historic Cartagena, blend innovation with deep colonial heritage.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Medellin_Vista_Parcial.jpg/800px-Medellin_Vista_Parcial.jpg',
  },
  CHL: {
    title: 'The Thin Strip of the World',
    text: 'Chile is one of the world\'s most geographically extreme countries, stretching 4,300 kilometers along the western edge of South America while averaging only 177 kilometers wide. It contains the Atacama Desert — the driest non-polar desert on Earth — as well as glaciers, volcanoes, and Patagonian fjords. Chile is also a leading wine producer and Latin America\'s most economically stable nation.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Torres_del_paine_chile.jpg/800px-Torres_del_paine_chile.jpg',
  },
  PER: {
    title: 'Cradle of the Inca Empire',
    text: 'Peru is home to one of the most remarkable civilizations in human history — the Inca Empire, whose legacy lives on in the iconic ruins of Machu Picchu. Spanning the Amazon rainforest, the Andean highlands, and Pacific coastal deserts, Peru\'s geography is extraordinary. Its cuisine, led by dishes like ceviche and lomo saltado, has gained global recognition as among the world\'s finest.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg',
  },

  // Europe
  FRA: {
    title: 'The Eternal Capital of Culture',
    text: 'France is one of the world\'s most visited countries, home to iconic landmarks like the Eiffel Tower, the Louvre, and the Palace of Versailles. As the birthplace of the Enlightenment, the French Revolution, and haute cuisine, France has shaped global philosophy, politics, and culture for centuries. Its diverse regions range from the sun-drenched vineyards of Bordeaux to the Alpine peaks of Chamonix.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/800px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg',
  },
  DEU: {
    title: 'The Engine of Europe',
    text: 'Germany is Europe\'s largest economy and a founding pillar of the European Union. A country of remarkable contrasts, it combines cutting-edge industry with medieval castles, deep forests, and Bavarian alpine villages. Germany\'s contributions to science, philosophy, music, and engineering — from Einstein to Beethoven to Volkswagen — have left an indelible mark on the world.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Hohenzollern_castle_from_afar.jpg/800px-Hohenzollern_castle_from_afar.jpg',
  },
  ITA: {
    title: 'Where History Breathes',
    text: 'Italy is the birthplace of the Roman Empire, the Renaissance, and Western civilization as we know it. With more UNESCO World Heritage Sites than any other country, Italy is an open-air museum spanning ancient ruins, medieval hilltop towns, and sun-kissed coastlines. Its food, fashion, and art continue to define global taste, from pizza and pasta to Ferrari and Versace.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/800px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg',
  },
  ESP: {
    title: 'A Mosaic of Peoples and Landscapes',
    text: 'Spain is a country of extraordinary regional diversity, where distinct cultures, languages, and landscapes coexist within a single nation. From the flamenco rhythms of Andalusia to the modernist architecture of Barcelona and the ancient pilgrimage routes of Galicia, Spain offers an unmatched richness of experience. It is also one of the world\'s top wine and olive oil producers.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sagrada_Familia_01.jpg/800px-Sagrada_Familia_01.jpg',
  },
  GBR: {
    title: 'The Island That Shaped the Modern World',
    text: 'The United Kingdom, comprising England, Scotland, Wales, and Northern Ireland, is a nation whose global influence far exceeds its modest size. As the cradle of the Industrial Revolution, parliamentary democracy, and the English language, the UK reshaped the modern world. Today it remains a global center of finance, culture, and diplomacy, home to institutions like the BBC, the NHS, and Oxford University.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg/800px-Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg',
  },
  PRT: {
    title: 'The Edge of Europe, the Door to the World',
    text: 'Portugal sits at the western edge of continental Europe, yet its spirit has always pointed outward. In the 15th and 16th centuries, Portuguese explorers charted the seas and connected continents, leaving behind a language now spoken by 260 million people worldwide. Today, Portugal enchants visitors with its golden beaches, ancient castles, soulful fado music, and some of the world\'s finest pastries.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/LisboaPanoramica.jpg/800px-LisboaPanoramica.jpg',
  },
  NLD: {
    title: 'A Nation Built Against the Sea',
    text: 'The Netherlands is a country defined by its extraordinary relationship with water — nearly a third of its territory lies below sea level, reclaimed over centuries through an intricate system of dikes and windmills. Beyond its engineering ingenuity, the Netherlands is home to a golden artistic tradition spanning Rembrandt and Vermeer, as well as being one of the world\'s most progressive and open societies.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/VanGoghMuseum-Amsterdam.jpg/800px-VanGoghMuseum-Amsterdam.jpg',
  },
  POL: {
    title: 'The Resilient Heart of Central Europe',
    text: 'Poland has endured centuries of hardship — partition, occupation, and war — yet has repeatedly re-emerged as one of Europe\'s most resilient nations. Today it is one of the EU\'s fastest-growing economies. Poland\'s cities, from the meticulously reconstructed old town of Warsaw to the medieval splendor of Kraków, stand as testament to a people who have always chosen to rebuild rather than forget.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Krakow_rynek.jpg/800px-Krakow_rynek.jpg',
  },

  // Asia
  CHN: {
    title: 'The Middle Kingdom',
    text: 'China is one of the world\'s oldest continuous civilizations, with a history spanning more than 5,000 years. Home to over 1.4 billion people, it is the world\'s most populous nation and the second-largest economy. From the Great Wall to the Forbidden City, from the karst landscapes of Guilin to the modern skyline of Shanghai, China encompasses a staggering breadth of history, culture, and geography.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_great_wall_8218.jpg/800px-20090529_great_wall_8218.jpg',
  },
  JPN: {
    title: 'Where Tradition Meets the Future',
    text: 'Japan is a country of profound contrasts — ancient temples and cutting-edge robotics, strict tradition and pop culture revolution. An archipelago of nearly 7,000 islands, Japan has developed one of the world\'s most distinctive civilizations, marked by concepts of harmony, craftsmanship, and aesthetic refinement. From Mount Fuji to the neon streets of Tokyo, Japan is unlike anywhere else on Earth.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Mount_Fuji_from_Hotel_Mt_Fuji_1995-11-10.jpg/800px-Mount_Fuji_from_Hotel_Mt_Fuji_1995-11-10.jpg',
  },
  IND: {
    title: 'The World\'s Largest Democracy',
    text: 'India is a civilization as much as a country — a land of 1.4 billion people, 22 official languages, and thousands of years of unbroken history. The birthplace of Hinduism, Buddhism, and Jainism, India has been a crossroads of trade, philosophy, and culture since antiquity. Today it is one of the world\'s fastest-growing major economies, home to a thriving technology sector and a film industry that produces more movies than any other nation.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Taj_Mahal%2C_Agra%2C_India_edit3.jpg/800px-Taj_Mahal%2C_Agra%2C_India_edit3.jpg',
  },
  KOR: {
    title: 'The Han River Miracle',
    text: 'South Korea transformed itself from one of the world\'s poorest nations in the 1950s into a global technological and cultural powerhouse within a single generation — an achievement known as the "Miracle on the Han River." Today, South Korea is home to global brands like Samsung and Hyundai, and its cultural exports — K-pop, K-drama, and Korean cuisine — have captivated audiences across the world.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Gyeongbokgung_Palace_Seoul.jpg/800px-Gyeongbokgung_Palace_Seoul.jpg',
  },
  TUR: {
    title: 'The Bridge Between Two Worlds',
    text: 'Turkey is the only country in the world that straddles two continents, with its European and Asian halves separated by the Bosphorus strait in Istanbul. This unique position has made Turkey a crossroads of civilizations for millennia, from the Hittites and Greeks to the Byzantine and Ottoman empires. Today, Istanbul remains one of the world\'s great cities, where ancient bazaars sit beside modern galleries.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg',
  },
  SAU: {
    title: 'The Land of the Two Holy Mosques',
    text: 'Saudi Arabia is the birthplace of Islam and home to its two holiest cities — Mecca and Medina — which draw millions of pilgrims each year. The world\'s largest oil exporter, Saudi Arabia has used its vast petroleum wealth to build a modern state from the desert. Under its Vision 2030 initiative, the country is now actively diversifying its economy and opening its ancient cultural heritage to the world.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kaaba_mirror_edit_jj.jpg/800px-Kaaba_mirror_edit_jj.jpg',
  },

  // Africa
  ZAF: {
    title: 'The Rainbow Nation',
    text: 'South Africa is one of the world\'s most ethnically and linguistically diverse nations, with 11 official languages and a history that has profoundly shaped global debates about justice and human rights. Known as the "Rainbow Nation" — a term coined by Archbishop Desmond Tutu — South Africa is home to extraordinary wildlife in Kruger National Park, the dramatic landscapes of the Cape, and the enduring legacy of Nelson Mandela.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty-south-africa.jpg/800px-24701-nature-natural-beauty-south-africa.jpg',
  },
  NGA: {
    title: 'The Giant of Africa',
    text: 'Nigeria is Africa\'s most populous country and largest economy, home to over 220 million people and more than 500 distinct ethnic groups. Often called the "Giant of Africa," Nigeria punches above its weight in culture — its Nollywood film industry is the world\'s second most prolific, its Afrobeats music has conquered global charts, and its cuisine is beloved across the continent and beyond.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Zuma_Rock_Nigeria.jpg/800px-Zuma_Rock_Nigeria.jpg',
  },
  EGY: {
    title: 'Gift of the Nile',
    text: 'Egypt is one of the world\'s oldest nations, a civilization that flourished along the Nile for over 5,000 years and left behind monuments that still astonish humanity. The Pyramids of Giza, the Sphinx, and the temples of Luxor are among the greatest achievements in human history. Today, Egypt is the Arab world\'s most populous country and a bridge between Africa, Asia, and Europe.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/800px-Kheops-Pyramid.jpg',
  },
  ETH: {
    title: 'The Cradle of Humanity',
    text: 'Ethiopia is one of the oldest nations on Earth and the only African country that was never colonized by a European power, successfully resisting Italian invasion at the Battle of Adwa in 1896. It is widely considered the birthplace of the human species, where some of the oldest hominid fossils have been discovered. Ethiopia is also the origin of coffee, a beverage that now fuels the entire world.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lalibela%2C_Bete_Giyorgis_01.jpg/800px-Lalibela%2C_Bete_Giyorgis_01.jpg',
  },
  KEN: {
    title: 'The Safari Capital of the World',
    text: 'Kenya is synonymous with wildlife and wilderness — home to the Maasai Mara, one of the greatest wildlife sanctuaries on Earth, where the annual Great Migration of wildebeest draws visitors from across the globe. Beyond its natural wonders, Kenya is East Africa\'s economic hub, with a dynamic tech sector that has earned Nairobi the nickname "Silicon Savannah."',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Kilimanjaro_from_Kenya_Jul_2007.jpg/800px-Kilimanjaro_from_Kenya_Jul_2007.jpg',
  },

  // Oceania
  AUS: {
    title: 'The Island Continent',
    text: 'Australia is the world\'s sixth-largest country and the only nation to occupy an entire continent. Its ancient landscape is home to some of the world\'s most unique wildlife — kangaroos, koalas, and platypuses — found nowhere else on Earth. From the red deserts of the Outback to the Great Barrier Reef, the world\'s largest coral ecosystem, Australia\'s natural wonders are unmatched in scale and originality.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sydney_Australia.(%239995).jpg/800px-Sydney_Australia.(%239995).jpg',
  },
  NZL: {
    title: 'Land of the Long White Cloud',
    text: 'New Zealand, or Aotearoa in the Māori language, is a remote archipelago in the southwestern Pacific renowned for its dramatic landscapes — towering fjords, volcanic plateaus, and pristine beaches. One of the last places on Earth to be settled by humans, New Zealand has developed a unique bicultural identity built on the partnership between the indigenous Māori people and settlers of European descent.',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Mitre_Peak.jpg/800px-Mitre_Peak.jpg',
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
      <Header showBack activeRegion="" />

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
