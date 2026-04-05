import { useState } from 'react'
import styles from './InputCard.module.css'

export default function InputCard({ title, accentColor, children }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={styles.card}>
      <button
        className={styles.header}
        onClick={() => setOpen((o) => !o)}
        style={{ '--accent': accentColor }}
      >
        <span className={styles.dot} style={{ background: accentColor }} />
        <span className={styles.title}>{title}</span>
        <span
          className={styles.chevron}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        >
          ▾
        </span>
      </button>

      {open && <div className={styles.body}>{children}</div>}
    </div>
  )
}
