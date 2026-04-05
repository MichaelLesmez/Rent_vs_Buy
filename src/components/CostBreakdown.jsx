import { formatCurrency } from '../utils/formatters'
import styles from './CostBreakdown.module.css'

function Row({ label, value, highlight }) {
  return (
    <div className={`${styles.row} ${highlight ? styles.total : ''}`}>
      <span className={styles.rowLabel}>{label}</span>
      <span
        className={styles.rowValue}
        style={highlight ? undefined : undefined}
      >
        {value}
      </span>
    </div>
  )
}

export default function CostBreakdown({ result }) {
  const { breakdown: b } = result
  const netBuyCost =
    b.totalMortgagePI +
    b.totalPropTax +
    b.totalHomeIns +
    b.totalMaintenance +
    b.closingCosts -
    b.totalTaxBenefit

  return (
    <div className={styles.grid}>
      {/* Buying */}
      <div className={`${styles.card} ${styles.buy}`}>
        <h3 className={styles.cardTitle}>
          <span className={styles.dot} style={{ background: '#2563eb' }} />
          Buying — Total Costs Over Period
        </h3>
        <Row label="Mortgage P&I" value={formatCurrency(b.totalMortgagePI)} />
        <Row label="Property Taxes" value={formatCurrency(b.totalPropTax)} />
        <Row label="Home Insurance" value={formatCurrency(b.totalHomeIns)} />
        <Row label="Maintenance" value={formatCurrency(b.totalMaintenance)} />
        <Row label="Closing Costs" value={formatCurrency(b.closingCosts)} />
        <Row
          label="Tax Benefit (saved)"
          value={'−' + formatCurrency(b.totalTaxBenefit)}
        />
        <Row
          label="Net Total Cost"
          value={formatCurrency(netBuyCost)}
          highlight
        />
      </div>

      {/* Renting */}
      <div className={`${styles.card} ${styles.rent}`}>
        <h3 className={styles.cardTitle}>
          <span className={styles.dot} style={{ background: '#dc2626' }} />
          Renting — Total Costs Over Period
        </h3>
        <Row label="Total Rent Paid" value={formatCurrency(b.totalRentPaid)} />
        <Row
          label="Renter's Insurance"
          value={formatCurrency(b.totalRenterIns)}
        />
        <Row
          label="Net Total Cost"
          value={formatCurrency(b.totalRentPaid + b.totalRenterIns)}
          highlight
        />
        <div className={styles.divider} />
        <p className={styles.investTitle}>Investment Portfolio</p>
        <Row
          label="Initial Investment (down pmt + closing)"
          value={formatCurrency(b.initialOutlay)}
        />
        <Row
          label="Additional Monthly Contributions"
          value={formatCurrency(b.totalAddlContrib)}
        />
        <Row
          label="Final Portfolio (before tax)"
          value={formatCurrency(b.finalPortfolio)}
        />
      </div>
    </div>
  )
}
