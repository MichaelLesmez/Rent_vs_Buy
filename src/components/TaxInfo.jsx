import { formatCurrency } from '../utils/formatters'
import styles from './TaxInfo.module.css'

export default function TaxInfo({ result, inputs }) {
  const { annualTaxBenefit, standardDed } = result
  const firstYearBenefit = annualTaxBenefit[1] ?? 0
  const lastDeductYear = annualTaxBenefit.reduce(
    (last, v, i) => (v > 0 ? i : last),
    0,
  )

  if (firstYearBenefit > 0) {
    return (
      <div className={styles.box}>
        <strong>Itemized deduction benefit:</strong> Year 1 tax savings ≈{' '}
        <strong>{formatCurrency(firstYearBenefit)}</strong> (mortgage interest +
        min(property taxes, $10K SALT cap) exceeds the{' '}
        {formatCurrency(standardDed)} standard deduction).{' '}
        {lastDeductYear < inputs.timeHorizon ? (
          <>
            Deduction advantage fades after year{' '}
            <strong>{lastDeductYear}</strong> as mortgage interest decreases.
          </>
        ) : (
          'Deduction benefit persists throughout the period.'
        )}
      </div>
    )
  }

  const annualPropTax = (inputs.homePrice * inputs.propTaxRate) / 100
  return (
    <div className={`${styles.box} ${styles.neutral}`}>
      <strong>No itemized deduction benefit:</strong> Mortgage interest +
      property taxes ({formatCurrency(annualPropTax)}/yr) do not exceed the{' '}
      {formatCurrency(standardDed)} standard deduction. The standard deduction
      is always taken.
    </div>
  )
}
