export const STARTING_BALANCE = 100000;
export const MAX_DRAWDOWN_LIMIT = 10000;
export const DAILY_LOSS_LIMIT = 5000;

export const calculateMetrics = (trades) => {
  let currentBalance = STARTING_BALANCE;
  let peakBalance = STARTING_BALANCE;
  let maxDrawdown = 0;
  
  let totalPnl = 0;
  let winningTrades = 0;
  let losingTrades = 0;
  let largestWin = 0;
  let largestLoss = 0;
  
  const equityCurveData = [{ trade: 0, balance: STARTING_BALANCE }];

  trades.forEach((trade, index) => {
    // Basic PnL updates
    totalPnl += trade.pnl;
    currentBalance += trade.pnl;
    
    // Win/Loss metrics
    if (trade.pnl > 0) {
      winningTrades++;
      if (trade.pnl > largestWin) largestWin = trade.pnl;
    } else if (trade.pnl < 0) {
      losingTrades++;
      if (trade.pnl < largestLoss) largestLoss = trade.pnl;
    }
    
    // Drawdown calculation (peak to trough)
    if (currentBalance > peakBalance) {
      peakBalance = currentBalance;
    }
    const currentDrawdownAmount = peakBalance - currentBalance;
    if (currentDrawdownAmount > maxDrawdown) {
      maxDrawdown = currentDrawdownAmount;
    }

    equityCurveData.push({
      trade: index + 1,
      balance: currentBalance,
      asset: trade.asset,
      pnl: trade.pnl
    });
  });

  const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;
  
  // Since we assume all trades are today, daily loss is just the starting balance minus current balance 
  // (if negative). If current balance is higher than starting, daily loss is 0.
  // Wait, if it's peak to trough intraday? The standard rule for prop firms is usually based on End Of Day balance.
  // For simplicity:
  const currentDayLoss = Math.max(0, STARTING_BALANCE - currentBalance);
  
  // Current active drawdown from highest peak
  const activeDrawdown = Math.max(0, peakBalance - currentBalance);

  return {
    currentBalance,
    totalPnl,
    winningTrades,
    losingTrades,
    winRate,
    largestWin,
    largestLoss,
    activeDrawdown,
    currentDayLoss,
    equityCurveData
  };
};
