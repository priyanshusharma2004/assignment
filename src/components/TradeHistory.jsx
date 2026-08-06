import React from 'react';

export const TradeHistory = ({ trades }) => {
  const formatCurrency = (val) => {
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(val));
    return val < 0 ? `-${formatted}` : `+${formatted}`;
  };

  return (
    <div className="card">
      <h2 className="metric-title" style={{ marginBottom: '1.5rem' }}>Recent Trades</h2>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>Direction</th>
              <th style={{ textAlign: 'right' }}>P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td style={{ color: 'var(--text-muted)' }}>#{trade.id}</td>
                <td style={{ fontWeight: 600 }}>{trade.asset}</td>
                <td>
                  <span className={`badge ${trade.direction.toLowerCase()}`}>
                    {trade.direction}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }} className={trade.pnl >= 0 ? 'text-green' : 'text-red'}>
                  {formatCurrency(trade.pnl)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
