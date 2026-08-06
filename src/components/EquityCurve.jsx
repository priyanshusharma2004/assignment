import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { STARTING_BALANCE } from '../utils/calculations';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    
    return (
      <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
          {data.trade === 0 ? 'Starting Balance' : `Trade #${data.trade} (${data.asset})`}
        </p>
        <p style={{ color: 'var(--text-main)', fontWeight: 700, fontSize: '1.125rem' }}>
          {formatCurrency(data.balance)}
        </p>
        {data.pnl && (
          <p style={{ color: data.pnl >= 0 ? 'var(--status-safe)' : 'var(--status-danger)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {data.pnl >= 0 ? '+' : ''}{formatCurrency(data.pnl)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const EquityCurve = ({ data }) => {
  const minBalance = Math.min(...data.map(d => d.balance));
  const maxBalance = Math.max(...data.map(d => d.balance));
  
  // Give it some padding
  const yDomain = [
    Math.floor(minBalance / 1000) * 1000 - 1000,
    Math.ceil(maxBalance / 1000) * 1000 + 1000
  ];

  return (
    <div className="card" style={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2 className="metric-title" style={{ marginBottom: '1.5rem' }}>Equity Curve</h2>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis 
              dataKey="trade" 
              stroke="var(--text-muted)" 
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => val === 0 ? 'Start' : `T${val}`}
            />
            <YAxis 
              domain={yDomain}
              stroke="var(--text-muted)" 
              tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val / 1000}k`}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={STARTING_BALANCE} stroke="var(--status-warning)" strokeDasharray="3 3" opacity={0.5} />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="var(--accent-blue)" 
              strokeWidth={3}
              dot={{ fill: 'var(--bg-card)', stroke: 'var(--accent-blue)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: 'var(--accent-blue)', stroke: 'var(--bg-main)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
