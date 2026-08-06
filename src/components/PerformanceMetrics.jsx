import React from 'react';

export const PerformanceMetrics = ({ totalPnl, winningTrades, losingTrades, winRate, largestWin, largestLoss }) => {
  const formatCurrency = (val) => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(val));
    return val < 0 ? `-${formatted}` : `+${formatted}`;
  };

  return (
    <div className="card">
      <h2 className="metric-title" style={{ marginBottom: '1.5rem' }}>Trading Performance</h2>
      
      <div className="grid-bottom" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h3 className="metric-title">Total P&L</h3>
          <div className={`metric-value large ${totalPnl >= 0 ? 'text-green' : 'text-red'}`}>
            {formatCurrency(totalPnl)}
          </div>
        </div>
        <div>
          <h3 className="metric-title">Win Rate</h3>
          <div className="metric-value large">{winRate.toFixed(1)}%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <div>
          <h4 className="metric-title" style={{ fontSize: '0.75rem' }}>Winning Trades</h4>
          <div className="metric-value" style={{ fontSize: '1.125rem' }}>{winningTrades}</div>
        </div>
        <div>
          <h4 className="metric-title" style={{ fontSize: '0.75rem' }}>Losing Trades</h4>
          <div className="metric-value" style={{ fontSize: '1.125rem' }}>{losingTrades}</div>
        </div>
        <div>
          <h4 className="metric-title" style={{ fontSize: '0.75rem' }}>Largest Win</h4>
          <div className="metric-value text-green" style={{ fontSize: '1.125rem' }}>{formatCurrency(largestWin)}</div>
        </div>
        <div>
          <h4 className="metric-title" style={{ fontSize: '0.75rem' }}>Largest Loss</h4>
          <div className="metric-value text-red" style={{ fontSize: '1.125rem' }}>{formatCurrency(largestLoss)}</div>
        </div>
      </div>
    </div>
  );
};
