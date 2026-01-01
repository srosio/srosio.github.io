---
layout: default
title: Performance Analytics
---

<link rel="stylesheet" href="/assets/css/trading.css">
<script>document.body.classList.add('trading-page');</script>

<div class="trading-header">
  <div class="container">
    <h1>📊 Performance Analytics</h1>
    <p>Analyze your trading performance and identify patterns</p>
  </div>
</div>

<div class="container">
  <!-- Summary Stats -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Total Trades</div>
      <div class="stat-value" id="analytics-total">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Win Rate</div>
      <div class="stat-value" id="analytics-winrate">0%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Average R:R</div>
      <div class="stat-value blue" id="analytics-rr">0.00</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Total P&L</div>
      <div class="stat-value" id="analytics-pnl">0%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Best Trade</div>
      <div class="stat-value green" id="analytics-best">0%</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Worst Trade</div>
      <div class="stat-value red" id="analytics-worst">0%</div>
    </div>
  </div>

  <!-- Performance by Setup Type -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Performance by Setup Quality</h3>
    <div id="setup-performance"></div>
  </div>

  <!-- Performance by Direction -->
  <div class="trading-grid" style="grid-template-columns: 1fr 1fr;">
    <div class="trading-card">
      <h3 style="margin-bottom: 2rem;">Long Trades</h3>
      <div class="dashboard-widget">
        <div class="widget-header">
          <div class="widget-title">Win Rate</div>
        </div>
        <div class="widget-value green" id="long-winrate">0%</div>
        <p style="color: var(--trading-text-muted); margin-top: 1rem;">
          <span id="long-count">0</span> trades | Avg P&L: <span id="long-avg">0%</span>
        </p>
      </div>
    </div>

    <div class="trading-card">
      <h3 style="margin-bottom: 2rem;">Short Trades</h3>
      <div class="dashboard-widget">
        <div class="widget-header">
          <div class="widget-title">Win Rate</div>
        </div>
        <div class="widget-value red" id="short-winrate">0%</div>
        <p style="color: var(--trading-text-muted); margin-top: 1rem;">
          <span id="short-count">0</span> trades | Avg P&L: <span id="short-avg">0%</span>
        </p>
      </div>
    </div>
  </div>

  <!-- Rule Compliance Analysis -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Rule Compliance Analysis</h3>
    <div id="rules-analysis"></div>
  </div>

  <!-- Emotional State vs Performance -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Emotional State vs Win Rate</h3>
    <div id="emotional-analysis"></div>
  </div>

  <!-- Trading Pairs Performance -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Top Trading Pairs</h3>
    <div id="pairs-performance"></div>
  </div>

  <!-- Recent Performance Trend -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Performance Timeline</h3>
    <div id="timeline"></div>
  </div>

  <!-- Insights & Recommendations -->
  <div class="trading-card">
    <h3 style="margin-bottom: 2rem;">Key Insights</h3>
    <div id="insights"></div>
  </div>

  <div style="text-align: center; margin-top: 3rem;">
    <a href="/trading-dashboard" class="trading-btn trading-btn-secondary" style="text-decoration: none; display: inline-block; margin-right: 1rem;">
      ← Back to Dashboard
    </a>
    <a href="/trading-logs" class="trading-btn trading-btn-primary" style="text-decoration: none; display: inline-block;">
      Log New Trade →
    </a>
  </div>
</div>

<script>
(function() {
  'use strict';

  function loadTrades() {
    const trades = localStorage.getItem('tradingLogs');
    return trades ? JSON.parse(trades) : [];
  }

  function calculateAnalytics() {
    const trades = loadTrades();

    if (trades.length === 0) {
      document.getElementById('analytics-total').textContent = '0';
      document.getElementById('analytics-winrate').textContent = '0%';
      document.getElementById('analytics-rr').textContent = '0.00';
      document.getElementById('analytics-pnl').textContent = '0%';
      document.getElementById('analytics-best').textContent = '0%';
      document.getElementById('analytics-worst').textContent = '0%';
      return;
    }

    // Basic stats
    const wins = trades.filter(t => t.outcome === 'win').length;
    const winRate = ((wins / trades.length) * 100).toFixed(1);

    // Calculate RR
    let totalRR = 0;
    trades.forEach(t => {
      const entry = parseFloat(t.entryPrice);
      const exit = parseFloat(t.exitPrice);
      const stop = parseFloat(t.stopLoss);
      if (t.direction === 'long') {
        const risk = entry - stop;
        const reward = exit - entry;
        if (risk > 0) totalRR += reward / risk;
      } else {
        const risk = stop - entry;
        const reward = entry - exit;
        if (risk > 0) totalRR += reward / risk;
      }
    });
    const avgRR = (totalRR / trades.length).toFixed(2);

    // Total P&L
    const totalPnL = trades.reduce((sum, t) => sum + parseFloat(t.pnl), 0).toFixed(2);

    // Best and worst
    const pnls = trades.map(t => parseFloat(t.pnl));
    const best = Math.max(...pnls).toFixed(2);
    const worst = Math.min(...pnls).toFixed(2);

    // Update display
    document.getElementById('analytics-total').textContent = trades.length;
    document.getElementById('analytics-winrate').textContent = winRate + '%';
    document.getElementById('analytics-rr').textContent = avgRR;
    document.getElementById('analytics-pnl').textContent = (totalPnL > 0 ? '+' : '') + totalPnL + '%';
    document.getElementById('analytics-best').textContent = '+' + best + '%';
    document.getElementById('analytics-worst').textContent = worst + '%';

    // Color winrate
    const winrateEl = document.getElementById('analytics-winrate');
    if (winRate >= 60) {
      winrateEl.classList.add('green');
    } else {
      winrateEl.classList.add('red');
    }

    // Color P&L
    const pnlEl = document.getElementById('analytics-pnl');
    if (totalPnL > 0) {
      pnlEl.classList.add('green');
    } else {
      pnlEl.classList.add('red');
    }

    // Setup performance
    analyzeSetupPerformance(trades);

    // Direction performance
    analyzeDirectionPerformance(trades);

    // Rules analysis
    analyzeRules(trades);

    // Emotional analysis
    analyzeEmotionalState(trades);

    // Pairs performance
    analyzePairs(trades);

    // Timeline
    renderTimeline(trades);

    // Insights
    generateInsights(trades);
  }

  function analyzeSetupPerformance(trades) {
    const setupTypes = {};

    trades.forEach(t => {
      if (!setupTypes[t.setupType]) {
        setupTypes[t.setupType] = { wins: 0, total: 0 };
      }
      setupTypes[t.setupType].total++;
      if (t.outcome === 'win') {
        setupTypes[t.setupType].wins++;
      }
    });

    let html = '<div style="overflow-x: auto;"><table class="trading-table"><thead><tr>';
    html += '<th>Setup Type</th><th>Total Trades</th><th>Wins</th><th>Win Rate</th></tr></thead><tbody>';

    Object.entries(setupTypes).forEach(([type, data]) => {
      const winRate = ((data.wins / data.total) * 100).toFixed(1);
      const color = winRate >= 60 ? 'green' : winRate >= 50 ? 'gold' : 'red';
      html += `<tr>`;
      html += `<td>${type}</td>`;
      html += `<td>${data.total}</td>`;
      html += `<td>${data.wins}</td>`;
      html += `<td><span class="trading-badge ${color}">${winRate}%</span></td>`;
      html += `</tr>`;
    });

    html += '</tbody></table></div>';
    document.getElementById('setup-performance').innerHTML = html;
  }

  function analyzeDirectionPerformance(trades) {
    const longs = trades.filter(t => t.direction === 'long');
    const shorts = trades.filter(t => t.direction === 'short');

    // Longs
    const longWins = longs.filter(t => t.outcome === 'win').length;
    const longWinRate = longs.length > 0 ? ((longWins / longs.length) * 100).toFixed(1) : 0;
    const longAvgPnL = longs.length > 0 ? (longs.reduce((sum, t) => sum + parseFloat(t.pnl), 0) / longs.length).toFixed(2) : 0;

    document.getElementById('long-winrate').textContent = longWinRate + '%';
    document.getElementById('long-count').textContent = longs.length;
    document.getElementById('long-avg').textContent = (longAvgPnL > 0 ? '+' : '') + longAvgPnL + '%';

    // Shorts
    const shortWins = shorts.filter(t => t.outcome === 'win').length;
    const shortWinRate = shorts.length > 0 ? ((shortWins / shorts.length) * 100).toFixed(1) : 0;
    const shortAvgPnL = shorts.length > 0 ? (shorts.reduce((sum, t) => sum + parseFloat(t.pnl), 0) / shorts.length).toFixed(2) : 0;

    document.getElementById('short-winrate').textContent = shortWinRate + '%';
    document.getElementById('short-count').textContent = shorts.length;
    document.getElementById('short-avg').textContent = (shortAvgPnL > 0 ? '+' : '') + shortAvgPnL + '%';
  }

  function analyzeRules(trades) {
    const rules = {
      structure: { followed: 0, wins: 0, total: 0 },
      delta: { followed: 0, wins: 0, total: 0 },
      liquidity: { followed: 0, wins: 0, total: 0 },
      timing: { followed: 0, wins: 0, total: 0 },
      position: { followed: 0, wins: 0, total: 0 }
    };

    trades.forEach(t => {
      Object.keys(rules).forEach(rule => {
        if (t.rules[rule]) {
          rules[rule].followed++;
          rules[rule].total++;
          if (t.outcome === 'win') rules[rule].wins++;
        }
      });
    });

    let html = '<div style="overflow-x: auto;"><table class="trading-table"><thead><tr>';
    html += '<th>Rule</th><th>Times Followed</th><th>Win Rate When Followed</th></tr></thead><tbody>';

    const ruleNames = {
      structure: '15M Structure + 5M BOS',
      delta: 'Delta Confirmation',
      liquidity: 'Liquidity Sweep',
      timing: 'Trading Window',
      position: 'Position Sizing'
    };

    Object.entries(rules).forEach(([rule, data]) => {
      const winRate = data.total > 0 ? ((data.wins / data.total) * 100).toFixed(1) : 0;
      const color = winRate >= 70 ? 'green' : winRate >= 50 ? 'gold' : 'red';
      html += `<tr>`;
      html += `<td>${ruleNames[rule]}</td>`;
      html += `<td>${data.followed}</td>`;
      html += `<td><span class="trading-badge ${color}">${winRate}%</span></td>`;
      html += `</tr>`;
    });

    html += '</tbody></table></div>';
    document.getElementById('rules-analysis').innerHTML = html;
  }

  function analyzeEmotionalState(trades) {
    const emotional = {};

    trades.forEach(t => {
      const state = t.emotionalState;
      if (!emotional[state]) {
        emotional[state] = { wins: 0, total: 0 };
      }
      emotional[state].total++;
      if (t.outcome === 'win') emotional[state].wins++;
    });

    let html = '<div style="overflow-x: auto;"><table class="trading-table"><thead><tr>';
    html += '<th>Emotional State</th><th>Total Trades</th><th>Win Rate</th></tr></thead><tbody>';

    Object.entries(emotional).sort((a, b) => b[0] - a[0]).forEach(([state, data]) => {
      const winRate = ((data.wins / data.total) * 100).toFixed(1);
      const color = winRate >= 60 ? 'green' : winRate >= 50 ? 'gold' : 'red';
      html += `<tr>`;
      html += `<td>Level ${state} ${state == 5 ? '(Calm)' : state <= 2 ? '(Emotional)' : ''}</td>`;
      html += `<td>${data.total}</td>`;
      html += `<td><span class="trading-badge ${color}">${winRate}%</span></td>`;
      html += `</tr>`;
    });

    html += '</tbody></table></div>';
    document.getElementById('emotional-analysis').innerHTML = html;
  }

  function analyzePairs(trades) {
    const pairs = {};

    trades.forEach(t => {
      if (!pairs[t.pair]) {
        pairs[t.pair] = { wins: 0, total: 0, pnl: 0 };
      }
      pairs[t.pair].total++;
      pairs[t.pair].pnl += parseFloat(t.pnl);
      if (t.outcome === 'win') pairs[t.pair].wins++;
    });

    let html = '<div style="overflow-x: auto;"><table class="trading-table"><thead><tr>';
    html += '<th>Pair</th><th>Trades</th><th>Win Rate</th><th>Total P&L</th></tr></thead><tbody>';

    Object.entries(pairs).sort((a, b) => b[1].total - a[1].total).slice(0, 10).forEach(([pair, data]) => {
      const winRate = ((data.wins / data.total) * 100).toFixed(1);
      const color = winRate >= 60 ? 'green' : winRate >= 50 ? 'gold' : 'red';
      const pnlColor = data.pnl > 0 ? 'green' : 'red';
      html += `<tr>`;
      html += `<td>${pair}</td>`;
      html += `<td>${data.total}</td>`;
      html += `<td><span class="trading-badge ${color}">${winRate}%</span></td>`;
      html += `<td style="color: var(--trading-${pnlColor}); font-weight: 600;">${data.pnl > 0 ? '+' : ''}${data.pnl.toFixed(2)}%</td>`;
      html += `</tr>`;
    });

    html += '</tbody></table></div>';
    document.getElementById('pairs-performance').innerHTML = html;
  }

  function renderTimeline(trades) {
    if (trades.length < 5) {
      document.getElementById('timeline').innerHTML = '<p style="text-align: center; color: var(--trading-text-muted); padding: 2rem;">Not enough trades for timeline analysis (minimum 5 required)</p>';
      return;
    }

    const recent = trades.slice(-20);
    let html = '<div style="display: flex; gap: 0.5rem; overflow-x: auto; padding: 1rem 0;">';

    recent.forEach(t => {
      const color = t.outcome === 'win' ? 'green' : t.outcome === 'loss' ? 'red' : 'gold';
      const height = Math.abs(t.pnl) * 10 + 20;
      html += `<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; min-width: 40px;">`;
      html += `<span style="font-size: 0.75rem; color: var(--trading-text-muted);">${new Date(t.date).toLocaleDateString().slice(0, 5)}</span>`;
      html += `<div style="width: 30px; height: ${height}px; background: var(--trading-${color}); border-radius: 4px; opacity: 0.8;" title="${t.pair}: ${t.pnl}%"></div>`;
      html += `<span style="font-size: 0.75rem; font-weight: 600; color: var(--trading-${color});">${t.pnl > 0 ? '+' : ''}${t.pnl}%</span>`;
      html += `</div>`;
    });

    html += '</div>';
    document.getElementById('timeline').innerHTML = html;
  }

  function generateInsights(trades) {
    if (trades.length < 10) {
      document.getElementById('insights').innerHTML = '<div class="trading-alert info">Complete at least 10 trades to generate insights.</div>';
      return;
    }

    const insights = [];

    // Win rate check
    const wins = trades.filter(t => t.outcome === 'win').length;
    const winRate = (wins / trades.length) * 100;

    if (winRate >= 60) {
      insights.push({
        type: 'success',
        message: `✅ Excellent win rate of ${winRate.toFixed(1)}%. You're meeting your target!`
      });
    } else {
      insights.push({
        type: 'warning',
        message: `⚠️ Win rate of ${winRate.toFixed(1)}% is below the 60% target. Review your entry criteria.`
      });
    }

    // Setup quality
    const aPlusSetups = trades.filter(t => t.setupType === 'a-plus');
    if (aPlusSetups.length > 0) {
      const aPlusWinRate = (aPlusSetups.filter(t => t.outcome === 'win').length / aPlusSetups.length) * 100;
      if (aPlusWinRate >= 70) {
        insights.push({
          type: 'success',
          message: `✅ A+ setups have ${aPlusWinRate.toFixed(1)}% win rate. Stick to A+ setups only!`
        });
      }
    }

    // Emotional state
    const calmTrades = trades.filter(t => parseInt(t.emotionalState) >= 4);
    const emotionalTrades = trades.filter(t => parseInt(t.emotionalState) <= 2);

    if (calmTrades.length > 0 && emotionalTrades.length > 0) {
      const calmWinRate = (calmTrades.filter(t => t.outcome === 'win').length / calmTrades.length) * 100;
      const emotionalWinRate = (emotionalTrades.filter(t => t.outcome === 'win').length / emotionalTrades.length) * 100;

      if (calmWinRate > emotionalWinRate + 20) {
        insights.push({
          type: 'warning',
          message: `⚠️ Calm trades win ${calmWinRate.toFixed(0)}% vs emotional trades ${emotionalWinRate.toFixed(0)}%. Emotional trading is costing you!`
        });
      }
    }

    // Direction bias
    const longs = trades.filter(t => t.direction === 'long');
    const shorts = trades.filter(t => t.direction === 'short');

    if (longs.length > shorts.length * 2) {
      insights.push({
        type: 'info',
        message: `📊 You trade longs ${((longs.length / trades.length) * 100).toFixed(0)}% of the time. Consider if you have a long bias.`
      });
    } else if (shorts.length > longs.length * 2) {
      insights.push({
        type: 'info',
        message: `📊 You trade shorts ${((shorts.length / trades.length) * 100).toFixed(0)}% of the time. Consider if you have a short bias.`
      });
    }

    // Rules compliance
    const fullCompliance = trades.filter(t => {
      return t.rules.structure && t.rules.delta && t.rules.liquidity && t.rules.timing && t.rules.position;
    });

    if (fullCompliance.length > 0) {
      const complianceWinRate = (fullCompliance.filter(t => t.outcome === 'win').length / fullCompliance.length) * 100;
      if (complianceWinRate >= 70) {
        insights.push({
          type: 'success',
          message: `✅ Full rule compliance = ${complianceWinRate.toFixed(1)}% win rate. The system works when you follow it!`
        });
      }
    }

    // Render insights
    let html = '';
    insights.forEach(insight => {
      html += `<div class="trading-alert ${insight.type}" style="margin-bottom: 1rem;">${insight.message}</div>`;
    });

    document.getElementById('insights').innerHTML = html;
  }

  // Initialize
  calculateAnalytics();
})();
</script>
