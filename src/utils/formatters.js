export function formatCurrency(v) {
  const abs = Math.abs(v)
  const sign = v < 0 ? '-' : ''
  if (abs >= 1_000_000) return sign + '$' + (abs / 1_000_000).toFixed(2) + 'M'
  if (abs >= 1_000) return sign + '$' + Math.round(abs).toLocaleString()
  return sign + '$' + Math.round(abs).toLocaleString()
}

export function formatPct(v, decimals = 1) {
  return v.toFixed(decimals) + '%'
}
