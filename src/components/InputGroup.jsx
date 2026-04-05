import styles from './InputGroup.module.css'

/**
 * A labelled slider + number input pair.
 *
 * Props:
 *   label       – display label
 *   value       – current numeric value
 *   onChange    – (number) => void
 *   min / max / step
 *   prefix      – e.g. '$'
 *   suffix      – e.g. '%' or ' yrs'
 *   decimals    – digits shown in the value badge
 *   accentColor – CSS var or hex used for slider track + thumb
 */
export default function InputGroup({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  decimals = 0,
  accentColor = '#6366f1',
}) {
  const pct = (((value - min) / (max - min)) * 100).toFixed(1)

  const formatted =
    prefix +
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix

  function handleRange(e) {
    onChange(parseFloat(e.target.value))
  }

  function handleNumber(e) {
    const v = parseFloat(e.target.value)
    if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
  }

  return (
    <div className={styles.group}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        <span className={styles.badge}>{formatted}</span>
      </div>
      <div className={styles.controls}>
        <input
          type="range"
          className={styles.range}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleRange}
          style={{
            '--accent': accentColor,
            '--pct': pct + '%',
          }}
        />
        <input
          type="number"
          className={styles.number}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleNumber}
        />
      </div>
    </div>
  )
}
