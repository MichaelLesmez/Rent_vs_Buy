import { useState, useCallback } from 'react'

const DEFAULTS = {
  income: 120000,
  timeHorizon: 30,
  filing: 'single',
  homePrice: 500000,
  downPct: 20,
  closingPct: 3,
  mortgageRate: 6.8,
  loanTerm: 30,
  propTaxRate: 1.1,
  homeInsurance: 2400,
  maintenancePct: 1,
  monthlyRent: 2500,
  rentIncrease: 3,
  renterInsurance: 240,
  investReturn: 7,
  capGainsTax: 15,
  homeGrowth: 3,
}

export function useInputs() {
  const [inputs, setInputs] = useState(DEFAULTS)

  const set = useCallback((key, value) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { inputs, set }
}
