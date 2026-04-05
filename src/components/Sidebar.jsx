import InputCard from './InputCard'
import InputGroup from './InputGroup'
import styles from './Sidebar.module.css'

const COLORS = {
  general: '#7c3aed',
  buying: '#2563eb',
  renting: '#dc2626',
  invest: '#059669',
}

export default function Sidebar({ inputs, set }) {
  return (
    <aside className={styles.sidebar}>
      {/* ── General ── */}
      <InputCard title="General" accentColor={COLORS.general}>
        <InputGroup
          label="Annual Income"
          value={inputs.income}
          onChange={(v) => set('income', v)}
          min={30000} max={600000} step={5000}
          prefix="$" decimals={0}
          accentColor={COLORS.general}
        />
        <InputGroup
          label="Time Horizon"
          value={inputs.timeHorizon}
          onChange={(v) => set('timeHorizon', v)}
          min={1} max={40} step={1}
          suffix=" yrs" decimals={0}
          accentColor={COLORS.general}
        />
        <div className={styles.selectGroup}>
          <label className={styles.selectLabel}>Filing Status</label>
          <select
            className={styles.select}
            value={inputs.filing}
            onChange={(e) => set('filing', e.target.value)}
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </div>
      </InputCard>

      {/* ── Buying ── */}
      <InputCard title="Buying" accentColor={COLORS.buying}>
        <InputGroup
          label="Home Price"
          value={inputs.homePrice}
          onChange={(v) => set('homePrice', v)}
          min={100000} max={3000000} step={10000}
          prefix="$" decimals={0}
          accentColor={COLORS.buying}
        />
        <InputGroup
          label="Down Payment"
          value={inputs.downPct}
          onChange={(v) => set('downPct', v)}
          min={3} max={50} step={0.5}
          suffix="%" decimals={1}
          accentColor={COLORS.buying}
        />
        <InputGroup
          label="Closing Costs"
          value={inputs.closingPct}
          onChange={(v) => set('closingPct', v)}
          min={0} max={8} step={0.25}
          suffix="%" decimals={2}
          accentColor={COLORS.buying}
        />
        <InputGroup
          label="Mortgage Rate"
          value={inputs.mortgageRate}
          onChange={(v) => set('mortgageRate', v)}
          min={2} max={12} step={0.05}
          suffix="%" decimals={2}
          accentColor={COLORS.buying}
        />
        <div className={styles.selectGroup}>
          <label className={styles.selectLabel}>Loan Term</label>
          <select
            className={styles.select}
            value={inputs.loanTerm}
            onChange={(e) => set('loanTerm', parseInt(e.target.value))}
          >
            <option value={30}>30 Years</option>
            <option value={20}>20 Years</option>
            <option value={15}>15 Years</option>
          </select>
        </div>
        <InputGroup
          label="Property Tax (annual)"
          value={inputs.propTaxRate}
          onChange={(v) => set('propTaxRate', v)}
          min={0.1} max={4} step={0.05}
          suffix="%" decimals={2}
          accentColor={COLORS.buying}
        />
        <InputGroup
          label="Home Insurance (annual)"
          value={inputs.homeInsurance}
          onChange={(v) => set('homeInsurance', v)}
          min={500} max={10000} step={100}
          prefix="$" decimals={0}
          accentColor={COLORS.buying}
        />
        <InputGroup
          label="Maintenance (annual)"
          value={inputs.maintenancePct}
          onChange={(v) => set('maintenancePct', v)}
          min={0.1} max={4} step={0.1}
          suffix="%" decimals={1}
          accentColor={COLORS.buying}
        />
      </InputCard>

      {/* ── Renting ── */}
      <InputCard title="Renting" accentColor={COLORS.renting}>
        <InputGroup
          label="Monthly Rent"
          value={inputs.monthlyRent}
          onChange={(v) => set('monthlyRent', v)}
          min={500} max={10000} step={50}
          prefix="$" decimals={0}
          accentColor={COLORS.renting}
        />
        <InputGroup
          label="Annual Rent Increase"
          value={inputs.rentIncrease}
          onChange={(v) => set('rentIncrease', v)}
          min={0} max={10} step={0.25}
          suffix="%" decimals={2}
          accentColor={COLORS.renting}
        />
        <InputGroup
          label="Renter's Insurance (annual)"
          value={inputs.renterInsurance}
          onChange={(v) => set('renterInsurance', v)}
          min={0} max={2000} step={10}
          prefix="$" decimals={0}
          accentColor={COLORS.renting}
        />
      </InputCard>

      {/* ── Investments ── */}
      <InputCard title="Investments" accentColor={COLORS.invest}>
        <InputGroup
          label="Expected Investment Return"
          value={inputs.investReturn}
          onChange={(v) => set('investReturn', v)}
          min={0} max={15} step={0.25}
          suffix="%" decimals={2}
          accentColor={COLORS.invest}
        />
        <InputGroup
          label="Capital Gains Tax Rate"
          value={inputs.capGainsTax}
          onChange={(v) => set('capGainsTax', v)}
          min={0} max={37} step={1}
          suffix="%" decimals={0}
          accentColor={COLORS.invest}
        />
        <InputGroup
          label="Real Estate Appreciation"
          value={inputs.homeGrowth}
          onChange={(v) => set('homeGrowth', v)}
          min={0} max={10} step={0.25}
          suffix="%" decimals={2}
          accentColor={COLORS.invest}
        />
      </InputCard>
    </aside>
  )
}
