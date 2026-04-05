import styles from './Assumptions.module.css'

const POINTS = [
  'Renter invests the full down payment + closing costs at the start of the period.',
  'Each month, the renter invests (or withdraws) the cost difference between buying and renting.',
  'Mortgage interest + property taxes (SALT cap $10,000) are compared to the standard deduction annually.',
  'Only the deduction amount above the standard deduction creates a tax benefit.',
  'Tax benefit is distributed monthly at 1/12 of the estimated annual amount.',
  "Renter's portfolio capital gains tax is applied to unrealized gains at each time point.",
  'Home value appreciates monthly at the specified annual real estate growth rate.',
  'Property taxes and maintenance scale with the current home value each month.',
  'Mortgage P&I is fixed; property tax and maintenance grow with home appreciation.',
  'Marginal tax rate estimated from 2024 IRS tax brackets based on income and filing status.',
  'Selling costs (agent fees ~5–6%) are not included — mentally reduce buyer net worth accordingly.',
  'No PMI is modelled; for <20% down, consider adding PMI cost to the maintenance rate.',
]

export default function Assumptions() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Methodology &amp; Assumptions</h3>
      <ul className={styles.list}>
        {POINTS.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}
