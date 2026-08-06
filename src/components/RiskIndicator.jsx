import React from 'react';
import { MAX_DRAWDOWN_LIMIT, DAILY_LOSS_LIMIT } from '../utils/calculations';

const ShieldAlertIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

const AlertTriangleIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

const CheckCircleIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export const RiskIndicator = ({ activeDrawdown, currentDayLoss }) => {
  const remainingDrawdown = MAX_DRAWDOWN_LIMIT - activeDrawdown;
  const remainingDailyLoss = DAILY_LOSS_LIMIT - currentDayLoss;

  const drawdownPercent = (activeDrawdown / MAX_DRAWDOWN_LIMIT) * 100;
  const dailyLossPercent = (currentDayLoss / DAILY_LOSS_LIMIT) * 100;

  const getStatus = (percent) => {
    if (percent >= 90) return { label: 'At Risk', color: 'var(--status-danger)', bg: 'rgba(239,68,68,0.2)', icon: <ShieldAlertIcon size={20} /> };
    if (percent >= 70) return { label: 'Approaching Limit', color: 'var(--status-warning)', bg: 'rgba(245,158,11,0.2)', icon: <AlertTriangleIcon size={20} /> };
    return { label: 'Safe', color: 'var(--status-safe)', bg: 'rgba(16,185,129,0.2)', icon: <CheckCircleIcon size={20} /> };
  };

  const drawdownStatus = getStatus(drawdownPercent);
  const dailyLossStatus = getStatus(dailyLossPercent);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="card">
      <h2 className="metric-title" style={{ marginBottom: '1.5rem' }}>Risk Indicator</h2>
      
      <div className="flex-col gap-4">
        {/* Drawdown Indicator */}
        <div>
          <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Max Drawdown Risk</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: drawdownStatus.color, backgroundColor: drawdownStatus.bg, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {drawdownStatus.icon} {drawdownStatus.label}
            </div>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${Math.min(drawdownPercent, 100)}%`, backgroundColor: drawdownStatus.color }}></div>
          </div>
          <div className="flex-between" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <span>Current: {formatCurrency(activeDrawdown)}</span>
            <span>Remaining: {formatCurrency(remainingDrawdown)}</span>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.5rem 0' }}></div>

        {/* Daily Loss Indicator */}
        <div>
          <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Daily Loss Risk</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: dailyLossStatus.color, backgroundColor: dailyLossStatus.bg, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {dailyLossStatus.icon} {dailyLossStatus.label}
            </div>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${Math.min(dailyLossPercent, 100)}%`, backgroundColor: dailyLossStatus.color }}></div>
          </div>
          <div className="flex-between" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <span>Current: {formatCurrency(currentDayLoss)}</span>
            <span>Remaining: {formatCurrency(remainingDailyLoss)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
