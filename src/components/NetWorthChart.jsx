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

export default function NetWorthChart({ result }) {
  const { years, buyerNW, renterNW } = result

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Buyer — Home Equity',
        data: buyerNW,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37,99,235,0.08)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
        tension: 0.35,
      },
      {
        label: 'Renter — Portfolio (after tax)',
        data: renterNW,
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220,38,38,0.06)',
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 5,
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
            `  ${ctx.dataset.label}: ${formatCurrency(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        title: { display: true, text: 'Years', font: { size: 12 } },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        title: { display: true, text: 'Net Worth', font: { size: 12 } },
        ticks: { callback: (v) => formatCurrency(v) },
      },
    },
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Net Worth Over Time</h3>
      <p className={styles.sub}>
        Buyer: home value minus remaining mortgage &nbsp;|&nbsp; Renter:
        investment portfolio after capital gains tax
      </p>
      <div className={styles.chartWrap}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
