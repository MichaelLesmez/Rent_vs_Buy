import { useMemo } from 'react'
import { useInputs } from './hooks/useInputs'
import { runSimulation } from './utils/calculations'
import Sidebar from './components/Sidebar'
import SummaryStats from './components/SummaryStats'
import NetWorthChart from './components/NetWorthChart'
import CostChart from './components/CostChart'
import CostBreakdown from './components/CostBreakdown'
import TaxInfo from './components/TaxInfo'
import Assumptions from './components/Assumptions'
import styles from './App.module.css'

export default function App() {
  const { inputs, set } = useInputs()

  const result = useMemo(() => runSimulation(inputs), [inputs])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.headerTitle}>Rent vs. Buy Calculator</h1>
          <p className={styles.headerSub}>
            Compare the long-term financial impact of renting &amp; investing
            vs. buying a home
          </p>
        </div>
      </header>

      <div className={styles.layout}>
        <Sidebar inputs={inputs} set={set} />

        <main className={styles.main}>
          <SummaryStats result={result} inputs={inputs} />
          <NetWorthChart result={result} />
          <CostChart result={result} />
          <CostBreakdown result={result} />
          <TaxInfo result={result} inputs={inputs} />
          <Assumptions />
        </main>
      </div>
    </div>
  )
}
