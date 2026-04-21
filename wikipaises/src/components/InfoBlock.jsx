import styles from './InfoBlock.module.css'

function InfoBlock({ icon, label, value }) {
  return (
    <div className={styles.block}>
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value || '—'}</span>
      </div>
    </div>
  )
}

export default InfoBlock
