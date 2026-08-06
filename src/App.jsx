import React, { useState, useMemo } from 'react';
import { AccountSummary } from './components/AccountSummary';
import { RiskIndicator } from './components/RiskIndicator';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { TradeHistory } from './components/TradeHistory';
import { EquityCurve } from './components/EquityCurve';
import { calculateMetrics } from './utils/calculations';

// Inline SVGs instead of lucide-react to prevent Vite/Rolldown resolution errors
const ActivityIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const initialTradeData = [
  { id: 1, asset: 'BTC', direction: 'Long', pnl: 1200 },
  { id: 2, asset: 'ETH', direction: 'Short', pnl: -450 },
  { id: 3, asset: 'BTC', direction: 'Short', pnl: 800 },
  { id: 4, asset: 'SOL', direction: 'Long', pnl: -300 },
  { id: 5, asset: 'ETH', direction: 'Long', pnl: 2000 },
];

function App() {
  const [trades] = useState(initialTradeData);

  const metrics = useMemo(() => calculateMetrics(trades), [trades]);

  return (
    <div className="dashboard-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'rgba(59,130,246,0.1)', padding: '0.75rem', borderRadius: '0.75rem', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIcon size={28} />
          </div>
          <div>
            <h1>Tradescape</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Trader Risk Dashboard</p>
          </div>
        </div>
      </header>

      <div className="grid-top">
        <AccountSummary currentBalance={metrics.currentBalance} />
        <RiskIndicator 
          activeDrawdown={metrics.activeDrawdown} 
          currentDayLoss={metrics.currentDayLoss} 
        />
        <PerformanceMetrics 
          totalPnl={metrics.totalPnl}
          winningTrades={metrics.winningTrades}
          losingTrades={metrics.losingTrades}
          winRate={metrics.winRate}
          largestWin={metrics.largestWin}
          largestLoss={metrics.largestLoss}
        />
      </div>

      <div className="grid-bottom" style={{ alignItems: 'start' }}>
        <div style={{ flex: 1, height: '100%' }}>
          <EquityCurve data={metrics.equityCurveData} />
        </div>
        <div style={{ flex: 1 }}>
          <TradeHistory trades={trades} />
        </div>
      </div>
    </div>
  );
}

export default App;
