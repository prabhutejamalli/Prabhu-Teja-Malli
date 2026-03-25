import React, { useState } from 'react';
import styles from './AnalyticsDashboard.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type DateRange = 'week' | 'month' | 'year';
type TxStatus  = 'completed' | 'pending' | 'processing' | 'cancelled';

interface KpiMetric {
  label:   string;
  value:   string;
  change:  string;
  up:      boolean;
  icon:    string;
}

interface MonthPoint {
  month:   string;
  revenue: number;
  orders:  number;
}

interface DayPoint {
  day:    string;
  orders: number;
}

interface Transaction {
  id:       string;
  customer: string;
  product:  string;
  amount:   number;
  status:   TxStatus;
  date:     string;
}

interface TopProduct {
  name:    string;
  sales:   number;
  revenue: number;
  growth:  number;
}

interface ChartPoint {
  x: number;
  y: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MONTHLY: MonthPoint[] = [
  { month: 'Jan', revenue: 820000,  orders: 280 },
  { month: 'Feb', revenue: 950000,  orders: 320 },
  { month: 'Mar', revenue: 880000,  orders: 295 },
  { month: 'Apr', revenue: 1120000, orders: 380 },
  { month: 'May', revenue: 1250000, orders: 415 },
  { month: 'Jun', revenue: 1080000, orders: 360 },
  { month: 'Jul', revenue: 1340000, orders: 450 },
  { month: 'Aug', revenue: 1280000, orders: 430 },
  { month: 'Sep', revenue: 1450000, orders: 490 },
  { month: 'Oct', revenue: 1580000, orders: 525 },
  { month: 'Nov', revenue: 1420000, orders: 478 },
  { month: 'Dec', revenue: 1680000, orders: 560 },
];

const WEEKLY: DayPoint[] = [
  { day: 'Mon', orders: 42 },
  { day: 'Tue', orders: 68 },
  { day: 'Wed', orders: 55 },
  { day: 'Thu', orders: 78 },
  { day: 'Fri', orders: 90 },
  { day: 'Sat', orders: 45 },
  { day: 'Sun', orders: 30 },
];

const TRANSACTIONS: Transaction[] = [
  { id: 'TXN-4521', customer: 'Rajesh Kumar',  product: 'Dashboard UI Kit',    amount: 12500, status: 'completed',  date: 'Today, 2:30 PM'     },
  { id: 'TXN-4520', customer: 'Priya Sharma',  product: 'Landing Page Design',  amount: 8900,  status: 'pending',    date: 'Today, 11:15 AM'    },
  { id: 'TXN-4519', customer: 'Arjun Reddy',   product: 'React Component Lib',  amount: 24000, status: 'completed',  date: 'Yesterday, 4:45 PM' },
  { id: 'TXN-4518', customer: 'Meera Nair',    product: 'Admin Panel Build',    amount: 18750, status: 'processing', date: 'Yesterday, 1:20 PM' },
  { id: 'TXN-4517', customer: 'Suresh Babu',   product: 'Mobile App UI',        amount: 32000, status: 'completed',  date: '2 days ago'         },
  { id: 'TXN-4516', customer: 'Kavita Singh',  product: 'Portfolio Website',    amount: 7500,  status: 'cancelled',  date: '3 days ago'         },
];

const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Admin Dashboard',   sales: 48, revenue: 576000, growth: 23  },
  { name: 'E-Commerce UI',     sales: 35, revenue: 385000, growth: 18  },
  { name: 'Mobile App UI',     sales: 28, revenue: 560000, growth: -5  },
  { name: 'Landing Page Kit',  sales: 62, revenue: 310000, growth: 31  },
  { name: 'Component Library', sales: 19, revenue: 342000, growth: 12  },
];

const KPI_BY_RANGE: Record<DateRange, KpiMetric[]> = {
  week: [
    { label: 'Revenue',         value: '₹3,24,500',  change: '+12.5%', up: true,  icon: '₹' },
    { label: 'Active Users',    value: '6,218',       change: '+8.2%',  up: true,  icon: '👥' },
    { label: 'New Orders',      value: '347',         change: '+3.7%',  up: true,  icon: '📦' },
    { label: 'Avg Order Value', value: '₹935',        change: '-2.1%',  up: false, icon: '📊' },
  ],
  month: [
    { label: 'Revenue',         value: '₹12,45,890', change: '+18.3%', up: true,  icon: '₹' },
    { label: 'Active Users',    value: '24,531',      change: '+11.4%', up: true,  icon: '👥' },
    { label: 'New Orders',      value: '1,429',       change: '+9.1%',  up: true,  icon: '📦' },
    { label: 'Avg Order Value', value: '₹872',        change: '+4.2%',  up: true,  icon: '📊' },
  ],
  year: [
    { label: 'Revenue',         value: '₹1.38 Cr',   change: '+34.7%', up: true,  icon: '₹' },
    { label: 'Active Users',    value: '1,24,500',    change: '+28.6%', up: true,  icon: '👥' },
    { label: 'New Orders',      value: '15,840',      change: '+22.3%', up: true,  icon: '📦' },
    { label: 'Avg Order Value', value: '₹872',        change: '+7.8%',  up: true,  icon: '📊' },
  ],
};

const STATUS_CONFIG: Record<TxStatus, { label: string; color: string; bg: string }> = {
  completed:  { label: 'Completed',  color: '#10b981', bg: 'rgba(16,185,129,0.12)'  },
  pending:    { label: 'Pending',    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
  processing: { label: 'Processing', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)'  },
  cancelled:  { label: 'Cancelled',  color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
};

// ─── Chart Helpers ────────────────────────────────────────────────────────────

function buildPoints(values: number[], W: number, H: number, padX: number, padY: number): ChartPoint[] {
  const minVal = Math.min(...values) * 0.88;
  const maxVal = Math.max(...values) * 1.08;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  return values.map((val, i) => ({
    x: padX + (i / (values.length - 1)) * innerW,
    y: padY + innerH - ((val - minVal) / (maxVal - minVal)) * innerH,
  }));
}

function smoothLinePath(points: ChartPoint[]): string {
  return points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    const prev = points[i - 1];
    const cp1x = (prev.x + (point.x - prev.x) * 0.4).toFixed(2);
    const cp2x = (prev.x + (point.x - prev.x) * 0.6).toFixed(2);
    return `${path} C ${cp1x} ${prev.y.toFixed(2)} ${cp2x} ${point.y.toFixed(2)} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, '');
}

function formatRevenue(value: number): string {
  if (value >= 1000000) return `${(value / 100000).toFixed(0)}L`;
  if (value >= 1000)    return `${(value / 1000).toFixed(0)}K`;
  return value.toString();
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LineChartProps {
  data:   number[];
  labels: string[];
  color:  string;
  id:     string;
}

const LineChart: React.FC<LineChartProps> = ({ data, labels, color, id }) => {
  const W = 620;
  const H = 190;
  const PAD_X = 52;
  const PAD_Y = 18;
  const BOTTOM = 34;
  const innerH = H - PAD_Y - BOTTOM;

  const points  = buildPoints(data, W, H - BOTTOM + PAD_Y, PAD_X, PAD_Y);
  const linePath = smoothLinePath(points);
  const lastPt   = points[points.length - 1];
  const firstPt  = points[0];
  const areaPath = `${linePath} L ${lastPt.x.toFixed(2)} ${(H - BOTTOM).toFixed(2)} L ${firstPt.x.toFixed(2)} ${(H - BOTTOM).toFixed(2)} Z`;

  const minVal = Math.min(...data) * 0.88;
  const maxVal = Math.max(...data) * 1.08;
  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount + 1 }, (_, i) => {
    const fraction = i / gridCount;
    const val = minVal + (maxVal - minVal) * fraction;
    const yPos = PAD_Y + innerH - fraction * innerH;
    return { yPos, label: formatRevenue(val) };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg} aria-label="Revenue trend chart">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {gridLines.map(({ yPos, label }) => (
        <g key={label}>
          <line x1={PAD_X} y1={yPos} x2={W - 10} y2={yPos} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PAD_X - 6} y={yPos + 4} textAnchor="end" fontSize="10" fill="#475569">{label}</text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#grad-${id})`} className={styles.chartArea} />

      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chartLine} />

      {/* Data points */}
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill={color} stroke="#0f172a" strokeWidth="2" className={styles.chartDot} />
      ))}

      {/* X-axis labels */}
      {labels.map((label, i) => {
        const xPos = PAD_X + (i / (labels.length - 1)) * (W - PAD_X * 2);
        return (
          <text key={label} x={xPos} y={H - 6} textAnchor="middle" fontSize="10" fill="#475569">{label}</text>
        );
      })}
    </svg>
  );
};

interface BarChartProps {
  data:  DayPoint[];
  color: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, color }) => {
  const W       = 300;
  const H       = 190;
  const PAD_X   = 12;
  const PAD_TOP = 24;
  const PAD_BOT = 28;
  const innerW  = W - PAD_X * 2;
  const innerH  = H - PAD_TOP - PAD_BOT;
  const maxVal  = Math.max(...data.map(d => d.orders)) * 1.18;
  const barW    = (innerW / data.length) * 0.52;
  const spacing = innerW / data.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chartSvg} aria-label="Orders by day chart">
      {data.map((point, i) => {
        const barH = (point.orders / maxVal) * innerH;
        const x    = PAD_X + i * spacing + (spacing - barW) / 2;
        const y    = PAD_TOP + innerH - barH;
        return (
          <g key={point.day}>
            <rect
              x={x} y={y} width={barW} height={barH}
              rx="5" ry="5"
              fill={color}
              opacity={i === 4 ? '1' : '0.65'}
              className={styles.bar}
              style={{ '--bar-height': `${barH}px` } as React.CSSProperties}
            />
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="9" fill={color} fontWeight="700">
              {point.orders}
            </text>
            <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="10" fill="#475569">
              {point.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>('month');

  const kpis         = KPI_BY_RANGE[dateRange];
  const revenueData  = MONTHLY.map(m => m.revenue);
  const monthLabels  = MONTHLY.map(m => m.month);
  const maxRevenue   = Math.max(...revenueData);

  return (
    <div className={styles.app}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Analytics Dashboard</h1>
          <p className={styles.subtitle}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className={styles.rangeTabs}>
          {(['week', 'month', 'year'] as DateRange[]).map(range => (
            <button
              key={range}
              className={[styles.rangeBtn, dateRange === range ? styles.rangeActive : ''].join(' ')}
              onClick={() => setDateRange(range)}
            >
              {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'This Year'}
            </button>
          ))}
        </div>
      </header>

      {/* ── KPI Cards ── */}
      <div className={styles.kpiRow}>
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className={styles.kpiCard} style={{ '--delay': `${i * 80}ms` } as React.CSSProperties}>
            <div className={styles.kpiTop}>
              <span className={styles.kpiLabel}>{kpi.label}</span>
              <span className={styles.kpiIcon}>{kpi.icon}</span>
            </div>
            <p className={styles.kpiValue}>{kpi.value}</p>
            <span className={[styles.kpiChange, kpi.up ? styles.kpiUp : styles.kpiDown].join(' ')}>
              {kpi.up ? '↑' : '↓'} {kpi.change}
              <span className={styles.kpiPeriod}> vs last {dateRange}</span>
            </span>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <h2 className={styles.chartTitle}>Revenue Trend</h2>
            <span className={styles.chartBadge}>Monthly 2024</span>
          </div>
          <LineChart data={revenueData} labels={monthLabels} color="#7c3aed" id="revenue" />
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartCardHeader}>
            <h2 className={styles.chartTitle}>Orders by Day</h2>
            <span className={styles.chartBadge}>This Week</span>
          </div>
          <BarChart data={WEEKLY} color="#0dd9b8" />
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className={styles.bottomRow}>

        {/* Transactions */}
        <div className={styles.tableCard}>
          <div className={styles.chartCardHeader}>
            <h2 className={styles.chartTitle}>Recent Transactions</h2>
            <span className={styles.viewAll}>View all →</span>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map(tx => {
                  const cfg = STATUS_CONFIG[tx.status];
                  return (
                    <tr key={tx.id} className={styles.tableRow}>
                      <td className={styles.txId}>{tx.id}</td>
                      <td className={styles.txCustomer}>{tx.customer}</td>
                      <td className={styles.txProduct}>{tx.product}</td>
                      <td className={styles.txAmount}>₹{tx.amount.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ color: cfg.color, background: cfg.bg }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className={styles.txDate}>{tx.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className={styles.productsCard}>
          <div className={styles.chartCardHeader}>
            <h2 className={styles.chartTitle}>Top Products</h2>
            <span className={styles.chartBadge}>By revenue</span>
          </div>
          <div className={styles.productsList}>
            {TOP_PRODUCTS.map(product => {
              const barPct = Math.round((product.revenue / maxRevenue) * 100);
              return (
                <div key={product.name} className={styles.productItem}>
                  <div className={styles.productHeader}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={[styles.productGrowth, product.growth >= 0 ? styles.growthUp : styles.growthDown].join(' ')}>
                      {product.growth >= 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                    </span>
                  </div>
                  <div className={styles.productMeta}>
                    <span>{product.sales} sales</span>
                    <span>₹{(product.revenue / 100000).toFixed(2)}L</span>
                  </div>
                  <div className={styles.productBar}>
                    <div className={styles.productBarFill} style={{ width: `${barPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
