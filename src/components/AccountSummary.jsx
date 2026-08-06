import React from 'react';
import { STARTING_BALANCE, MAX_DRAWDOWN_LIMIT, DAILY_LOSS_LIMIT } from '../utils/calculations';

export const AccountSummary = ({ currentBalance }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="card">
      <div className="flex-between">
        <div>
          <h2 className="metric-title">Starting Balance</h2>
          <div className="metric-value">{formatCurrency(STARTING_BALANCE)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 className="metric-title">Current Balance</h2>
          <div className={`metric-value ${currentBalance >= STARTING_BALANCE ? 'text-green' : 'text-red'}`}>
            {formatCurrency(currentBalance)}
          </div>
        </div>
      </div>
      
      <div className="grid-bottom" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <div>
          <h3 className="metric-title">Max Drawdown Limit</h3>
          <div className="metric-value">{formatCurrency(MAX_DRAWDOWN_LIMIT)}</div>
        </div>
        <div>
          <h3 className="metric-title">Daily Loss Limit</h3>
          <div className="metric-value">{formatCurrency(DAILY_LOSS_LIMIT)}</div>
        </div>
      </div>
    </div>
  );
};
