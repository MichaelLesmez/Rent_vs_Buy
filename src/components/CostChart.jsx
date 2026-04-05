import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { formatCurrency } from '../utils/formatters'
import styles from './ChartCard.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

export default function CostChart({ result }) {
  const { buyerMonthly, renterMonthly } = result
  const labels = buyerMonthly.map((_, i) => i + 1)

  const data = {
    labels,
    datasets: [
      {
        label: 'Buyer — All-In Monthly Cost',
        data: buyerMonthly,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.06)',
        borderWidth: 2,
        pointRadius: 2,
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Renter — Monthly Cost',
        data: renterMonthly,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220,38,38,0.05)',
        borderWidth: 2,
        pointRadius: 2,
        fill: true,
        tension: 0.35,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: { padding: 16, font: { size: 12 }, usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          title: (items) => `Year ${items[0].label}`,
          label: (ctx) =>
            `  ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}/mo`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        title: { display: true, text: 'Year', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        title: { display: true, text: 'Monthly Cost', font: { size: 12 } },
        ticks: { callback: (v) => formatCurrency(v) },
      },
    },
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Monthly Cost Comparison</h3>
      <p className={styles.sub}>
        Buyer: mortgage P&amp;I + property tax + insurance + maintenance − tax
        benefit &nbsp;|&nbsp; Renter: rent + insurance
      </p>
      <div className={styles.chartWrap}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
