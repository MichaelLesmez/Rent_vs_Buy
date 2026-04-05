// ── Tax helpers ──────────────────────────────────────────────────────────────

export function getMarginalRate(income, filing) {
  const brackets =
    filing === 'married'
      ? [
          [23200, 0.1],
          [94300, 0.12],
          [201050, 0.22],
          [383900, 0.24],
          [487450, 0.32],
          [731200, 0.35],
          [Infinity, 0.37],
        ]
      : [
          [11600, 0.1],
          [47150, 0.12],
          [100525, 0.22],
          [191950, 0.24],
          [243725, 0.32],
          [609350, 0.35],
          [Infinity, 0.37],
        ]
  for (const [threshold, rate] of brackets) {
    if (income <= threshold) return rate
  }
  return 0.37
}

export function getStandardDeduction(filing) {
  return filing === 'married' ? 29200 : 14600
}

// ── Main simulation ───────────────────────────────────────────────────────────

export function runSimulation(inp) {
  const {
    income,
    timeHorizon,
    filing,
    homePrice,
    downPct,
    closingPct,
    mortgageRate,
    loanTerm,
    propTaxRate,
    homeInsurance,
    maintenancePct,
    monthlyRent,
    rentIncrease,
    renterInsurance,
    investReturn,
    capGainsTax,
    homeGrowth,
  } = inp

  const SALT_CAP = 10000
  const marginalRate = getMarginalRate(income, filing)
  const standardDed = getStandardDeduction(filing)

  const downPayment = homePrice * (downPct / 100)
  const closingCosts = homePrice * (closingPct / 100)
  const loanAmount = homePrice - downPayment
  const initialOutlay = downPayment + closingCosts

  const r = mortgageRate / 100 / 12
  const n = loanTerm * 12
  const monthlyPI =
    loanAmount > 0
      ? r > 0
        ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        : loanAmount / n
      : 0

  const monthlyInvRate = investReturn / 100 / 12
  const monthlyHomeGrowth = homeGrowth / 100 / 12

  // Pre-compute annual tax benefit via amortisation pass
  const annualTaxBenefit = new Array(timeHorizon + 1).fill(0)
  {
    let bal = loanAmount
    let hv = homePrice
    for (let yr = 1; yr <= Math.min(timeHorizon, loanTerm); yr++) {
      let yrInterest = 0
      let yrPropTax = 0
      for (let m = 0; m < 12; m++) {
        if (bal > 0) {
          const interest = bal * r
          const principal = Math.min(monthlyPI - interest, bal)
          yrInterest += interest
          bal = Math.max(0, bal - principal)
        }
        hv *= 1 + monthlyHomeGrowth
        yrPropTax += (hv * propTaxRate) / 100 / 12
      }
      const itemized = yrInterest + Math.min(yrPropTax, SALT_CAP)
      if (itemized > standardDed) {
        annualTaxBenefit[yr] = (itemized - standardDed) * marginalRate
      }
    }
  }

  // Main month-by-month simulation
  let mortgageBal = loanAmount
  let homeValue = homePrice
  let currentRent = monthlyRent
  let portfolioBasis = initialOutlay
  let portfolioValue = initialOutlay

  // Breakdown accumulators
  let totalMortgagePI = 0
  let totalPropTax = 0
  let totalHomeIns = 0
  let totalMaintenance = 0
  let totalTaxBenefit = 0
  let totalRentPaid = 0
  let totalRenterIns = 0
  let totalAddlContrib = 0

  const years = [0]
  const buyerNW = [homePrice - loanAmount - closingCosts]
  const renterNW = [
    portfolioBasis +
      Math.max(0, portfolioValue - portfolioBasis) * (1 - capGainsTax / 100),
  ]
  const buyerMonthly = []
  const renterMonthly = []

  for (let month = 1; month <= timeHorizon * 12; month++) {
    const yr = Math.ceil(month / 12)

    // Annual rent increase at start of each new year
    if (month % 12 === 1 && month > 1) {
      currentRent *= 1 + rentIncrease / 100
    }

    // Buyer: amortisation
    let interestPaid = 0
    let principalPaid = 0
    if (mortgageBal > 0 && month <= n) {
      interestPaid = mortgageBal * r
      principalPaid = Math.min(monthlyPI - interestPaid, mortgageBal)
      mortgageBal = Math.max(0, mortgageBal - principalPaid)
    }
    totalMortgagePI += interestPaid + principalPaid

    homeValue *= 1 + monthlyHomeGrowth

    const monthlyPropTax = (homeValue * propTaxRate) / 100 / 12
    const monthlyHomeIns = homeInsurance / 12
    const monthlyMaint = (homeValue * maintenancePct) / 100 / 12
    const monthlyTaxCredit = annualTaxBenefit[yr] / 12

    totalPropTax += monthlyPropTax
    totalHomeIns += monthlyHomeIns
    totalMaintenance += monthlyMaint
    totalTaxBenefit += monthlyTaxCredit

    const buyerCost =
      (month <= n ? monthlyPI : 0) +
      monthlyPropTax +
      monthlyHomeIns +
      monthlyMaint -
      monthlyTaxCredit

    // Renter costs
    const renterCost = currentRent + renterInsurance / 12
    totalRentPaid += currentRent
    totalRenterIns += renterInsurance / 12

    // Renter portfolio
    portfolioValue *= 1 + monthlyInvRate
    const netToInvest = buyerCost - renterCost
    if (netToInvest > 0) {
      portfolioValue += netToInvest
      portfolioBasis += netToInvest
      totalAddlContrib += netToInvest
    } else if (netToInvest < 0 && portfolioValue > 0) {
      const withdrawal = -netToInvest
      const gainRatio = Math.max(0, (portfolioValue - portfolioBasis) / portfolioValue)
      portfolioBasis = Math.max(0, portfolioBasis - withdrawal * (1 - gainRatio))
      portfolioValue = Math.max(0, portfolioValue - withdrawal)
    }

    if (month % 12 === 0) {
      years.push(yr)
      buyerNW.push(homeValue - mortgageBal)
      const gains = Math.max(0, portfolioValue - portfolioBasis)
      renterNW.push(portfolioBasis + gains * (1 - capGainsTax / 100))
      buyerMonthly.push(buyerCost)
      renterMonthly.push(renterCost)
    }
  }

  // Break-even: first year buyer NW >= renter NW
  let breakEvenYear = null
  for (let i = 1; i < years.length; i++) {
    if (buyerNW[i] >= renterNW[i]) {
      breakEvenYear = years[i]
      break
    }
  }

  return {
    years,
    buyerNW,
    renterNW,
    buyerMonthly,
    renterMonthly,
    breakEvenYear,
    marginalRate,
    standardDed,
    annualTaxBenefit,
    finalPortfolioValue: portfolioValue,
    breakdown: {
      totalMortgagePI,
      totalPropTax,
      totalHomeIns,
      totalMaintenance,
      totalTaxBenefit,
      closingCosts,
      totalRentPaid,
      totalRenterIns,
      initialOutlay,
      totalAddlContrib,
      finalPortfolio: portfolioValue,
    },
  }
}
