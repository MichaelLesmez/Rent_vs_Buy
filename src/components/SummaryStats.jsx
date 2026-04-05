import { formatCurrency } from '../utils/formatters'
import styles from './SummaryStats.module.css'

export default function SummaryStats({ result, inputs }) {
  const { buyerNW, renterNW, breakEvenYear, marginalRate, standardDed } = result
  const finalBuyer = buyerNW[buyerNW.length - 1]
  const finalRenter = renterNW[renterNW.length - 1]
  const buyerWins = finalBuyer >= finalRenter

  let breakEvenText = ''
  let breakEvenSub = ''
  if (breakEvenYear !== null) {
    breakEvenText = `Year ${breakEvenYear}`
    breakEvenSub = 'buying surpasses renting'
  } else if (buyerWins) {
    breakEvenText = '< Year 1'
    breakEvenSub = 'buying ahead from the start'
  } else {
    breakEvenText = 'Never'
    breakEvenSub = 'renting stays ahead over period'
  }

  return (
    <div className={styles.grid}>
      <div className={`${styles.card} ${styles.buy}`}>
        <div className={styles.cardLabel}>Buyer Net Worth</div>
        <div className={`${styles.cardValue} ${styles.buyColor}`}>
          {formatCurrency(finalBuyer)}
        </div>
        <div className={styles.cardSub}>after {inputs.timeHorizon} years</div>
      </div>

      <div className={`${styles.card} ${styles.rent}`}>
        <div className={styles.cardLabel}>Renter Net Worth</div>
        <div className={`${styles.cardValue} ${styles.rentColor}`}>
          {formatCurrency(finalRenter)}
        </div>
        <div className={styles.cardSub}>after {inputs.timeHorizon} years</div>
      </div>

      <div className={`${styles.card} ${styles.neutral}`}>
        <div className={styles.cardLabel}>Break-Even Year</div>
        <div className={`${styles.cardValue} ${styles.neutralColor}`}>
          {breakEvenText}
        </div>
        <div className={styles.cardSub}>{breakEvenSub}</div>
      </div>

      <div className={`${styles.card} ${styles.general}`}>
        <div className={styles.cardLabel}>Marginal Tax Rate</div>
        <div className={`${styles.cardValue} ${styles.generalColor}`}>
          {(marginalRate * 100).toFixed(0)}%
        </div>
        <div className={styles.cardSub}>
          Std deduction: {formatCurrency(standardDed)}
        </div>
      </div>
    </div>
  )
}
