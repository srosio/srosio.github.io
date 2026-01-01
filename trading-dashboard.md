---
layout: default
title: Trading Dashboard
---

<link rel="stylesheet" href="/assets/css/trading.css">
<script>document.body.classList.add('trading-page');</script>

<div class="trading-header">
  <div class="container">
    <h1>⚡ Trading Command Center</h1>
    <p>Your systematic approach to profitable trading - Track, Analyze, Execute</p>
  </div>
</div>

<div class="container">
  <!-- Quick Stats -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-label">Today's Trades</div>
      <div class="stat-value gold" id="dash-today-trades">0</div>
      <div class="trading-progress">
        <div class="trading-progress-bar" id="today-progress" style="width: 0%"></div>
      </div>
      <div style="font-size: 0.75rem; color: var(--trading-text-muted); margin-top: 0.5rem;">
        Limit: 2 trades/day
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Weekly Trades</div>
      <div class="stat-value gold" id="dash-week-trades">0</div>
      <div class="trading-progress">
        <div class="trading-progress-bar" id="week-progress" style="width: 0%"></div>
      </div>
      <div style="font-size: 0.75rem; color: var(--trading-text-muted); margin-top: 0.5rem;">
        Limit: 8 trades/week
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Win Rate</div>
      <div class="stat-value" id="dash-winrate">0%</div>
      <div style="font-size: 0.75rem; margin-top: 0.5rem;">
        Target: <span style="color: var(--trading-gold);">60%+</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Avg Risk:Reward</div>
      <div class="stat-value blue" id="dash-rr">0.00</div>
      <div style="font-size: 0.75rem; margin-top: 0.5rem;">
        Target: <span style="color: var(--trading-gold);">1.5:1+</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Rule Compliance</div>
      <div class="stat-value" id="dash-compliance">0%</div>
      <div style="font-size: 0.75rem; margin-top: 0.5rem;">
        Target: <span style="color: var(--trading-gold);">100%</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-label">Total Trades</div>
      <div class="stat-value" id="dash-total">0</div>
      <div style="font-size: 0.75rem; margin-top: 0.5rem;">
        <span style="color: var(--trading-green);" id="dash-wins">0</span> W /
        <span style="color: var(--trading-red);" id="dash-losses">0</span> L
      </div>
    </div>
  </div>

  <!-- Trade Status Alert -->
  <div id="trade-alert" style="display: none;"></div>

  <!-- Main Dashboard Grid -->
  <div class="trading-grid">
    <!-- Quick Actions -->
    <div class="trading-card">
      <div class="trading-card-header">
        <div class="trading-card-title">
          <div class="trading-card-icon">📝</div>
          Quick Actions
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <a href="/trading-logs" class="trading-btn trading-btn-primary" style="text-align: center; text-decoration: none; display: block;">
          Log New Trade
        </a>
        <a href="/trading-systems" class="trading-btn trading-btn-secondary" style="text-align: center; text-decoration: none; display: block;">
          View Systems
        </a>
        <a href="/trading-analytics" class="trading-btn trading-btn-secondary" style="text-align: center; text-decoration: none; display: block;">
          Performance Analytics
        </a>
        <button onclick="exportAllData()" class="trading-btn trading-btn-secondary">
          Export All Data
        </button>
      </div>
    </div>

    <!-- Today's Trading Window -->
    <div class="trading-card">
      <div class="trading-card-header">
        <div class="trading-card-title">
          <div class="trading-card-icon">🕐</div>
          Trading Windows (UTC)
        </div>
      </div>
      <div id="trading-windows">
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 600;">London Session</span>
            <span class="trading-badge" id="london-status">Closed</span>
          </div>
          <div style="color: var(--trading-text-muted); font-size: 0.875rem;">08:00 - 12:00 UTC</div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 600;">New York Session</span>
            <span class="trading-badge" id="ny-status">Closed</span>
          </div>
          <div style="color: var(--trading-text-muted); font-size: 0.875rem;">13:00 - 17:00 UTC</div>
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--trading-border);">
          <div style="text-align: center; color: var(--trading-text-muted); font-size: 0.875rem;">
            Current UTC Time
          </div>
          <div id="current-time" style="text-align: center; font-size: 1.5rem; font-weight: 700; color: var(--trading-gold); margin-top: 0.5rem;">
            --:--:--
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Trades -->
    <div class="trading-card" style="grid-column: span 2;">
      <div class="trading-card-header">
        <div class="trading-card-title">
          <div class="trading-card-icon">📊</div>
          Recent Trades
        </div>
        <a href="/trading-logs" style="color: var(--trading-gold); text-decoration: none; font-size: 0.875rem;">
          View All →
        </a>
      </div>
      <div id="recent-trades">
        <p style="text-align: center; color: var(--trading-text-muted); padding: 2rem;">
          No recent trades. <a href="/trading-logs" style="color: var(--trading-gold);">Log your first trade</a>
        </p>
      </div>
    </div>
  </div>

  <!-- The 3 Systems Overview -->
  <div class="trading-card">
    <div class="trading-card-header">
      <div class="trading-card-title">
        <div class="trading-card-icon">🎯</div>
        Your 3 Critical Trading Systems
      </div>
      <a href="/trading-systems" style="color: var(--trading-gold); text-decoration: none; font-size: 0.875rem;">
        Full Documentation →
      </a>
    </div>
    <div class="trading-grid">
      <div class="dashboard-widget">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📋</div>
        <h3 style="color: var(--trading-gold); margin-bottom: 0.5rem;">System 1</h3>
        <h4 style="color: var(--trading-text); font-size: 1rem; margin-bottom: 1rem;">Session-Based Structure</h4>
        <p style="color: var(--trading-text-muted); font-size: 0.875rem; line-height: 1.6;">
          Removes discretion through strict time windows and pre-marked levels. No decisions during live candles.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 1rem; color: var(--trading-text); font-size: 0.875rem;">
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ Pre-market checklists</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ London/NY windows only</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ Mechanical entry/exit rules</li>
        </ul>
      </div>

      <div class="dashboard-widget">
        <div style="font-size: 2rem; margin-bottom: 1rem;">📈</div>
        <h3 style="color: var(--trading-gold); margin-bottom: 0.5rem;">System 2</h3>
        <h4 style="color: var(--trading-text); font-size: 1rem; margin-bottom: 1rem;">Volume Delta Confirmation</h4>
        <p style="color: var(--trading-text-muted); font-size: 0.875rem; line-height: 1.6;">
          Eliminates false signals by showing who's more urgent. Objective filter for real breakouts vs. noise.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 1rem; color: var(--trading-text); font-size: 0.875rem;">
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ CVD divergence detection</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ Delta spike confirmation</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ Institutional flow alignment</li>
        </ul>
      </div>

      <div class="dashboard-widget">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🔒</div>
        <h3 style="color: var(--trading-gold); margin-bottom: 0.5rem;">System 3</h3>
        <h4 style="color: var(--trading-text); font-size: 1rem; margin-bottom: 1rem;">Trade Limits + Review</h4>
        <p style="color: var(--trading-text-muted); font-size: 0.875rem; line-height: 1.6;">
          Breaks emotional loops through forced scarcity and systematic review. Quality over quantity.
        </p>
        <ul style="list-style: none; padding: 0; margin-top: 1rem; color: var(--trading-text); font-size: 0.875rem;">
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ 2 trades/day maximum</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ 2-hour cooling period</li>
          <li style="padding: 0.5rem 0; border-top: 1px solid var(--trading-border);">✓ Weekly performance review</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Pre-Market Checklist -->
  <div class="trading-card">
    <div class="trading-card-header">
      <div class="trading-card-title">
        <div class="trading-card-icon">✓</div>
        Daily Pre-Market Checklist
      </div>
    </div>
    <div class="trading-checklist">
      <div class="trading-checklist-item">
        <input type="checkbox" id="check1" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check1">Mark yesterday's high/low/close</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check2" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check2">Mark Asian session high/low (00:00-08:00 UTC)</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check3" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check3">Mark current week high/low</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check4" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check4">Identify 3 liquidity pools (equal highs/lows, round numbers)</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check5" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check5">Check funding rate (>0.05% or <-0.03% = caution)</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check6" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check6">Check OI trend (rising or falling?)</label>
      </div>
      <div class="trading-checklist-item">
        <input type="checkbox" id="check7" style="width: 20px; height: 20px; accent-color: var(--trading-gold);">
        <label for="check7">Define higher timeframe bias (15M structure: bullish/bearish/neutral)</label>
      </div>
    </div>
    <button onclick="resetChecklist()" class="trading-btn trading-btn-secondary" style="width: 100%; margin-top: 1rem;">
      Reset Checklist
    </button>
  </div>
</div>

<script>
(function() {
  'use strict';

  // Load trades from localStorage
  function loadTrades() {
    const trades = localStorage.getItem('tradingLogs');
    return trades ? JSON.parse(trades) : [];
  }

  // Calculate statistics
  function calculateStats() {
    const trades = loadTrades();
    const now = new Date();
    const today = now.toDateString();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    const todayTrades = trades.filter(t => new Date(t.date).toDateString() === today);
    const weekTrades = trades.filter(t => new Date(t.date) >= weekStart);
    const wins = trades.filter(t => t.outcome === 'win').length;
    const losses = trades.filter(t => t.outcome === 'loss').length;
    const winRate = trades.length > 0 ? ((wins / trades.length) * 100).toFixed(1) : 0;

    // Calculate average RR
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
    const avgRR = trades.length > 0 ? (totalRR / trades.length).toFixed(2) : 0;

    // Calculate rule compliance
    let totalRules = 0;
    let followedRules = 0;
    trades.forEach(t => {
      totalRules += 5;
      if (t.rules.structure) followedRules++;
      if (t.rules.delta) followedRules++;
      if (t.rules.liquidity) followedRules++;
      if (t.rules.timing) followedRules++;
      if (t.rules.position) followedRules++;
    });
    const compliance = totalRules > 0 ? ((followedRules / totalRules) * 100).toFixed(1) : 0;

    // Update display
    document.getElementById('dash-today-trades').textContent = todayTrades.length;
    document.getElementById('dash-week-trades').textContent = weekTrades.length;
    document.getElementById('dash-winrate').textContent = winRate + '%';
    document.getElementById('dash-rr').textContent = avgRR;
    document.getElementById('dash-compliance').textContent = compliance + '%';
    document.getElementById('dash-total').textContent = trades.length;
    document.getElementById('dash-wins').textContent = wins;
    document.getElementById('dash-losses').textContent = losses;

    // Update progress bars
    document.getElementById('today-progress').style.width = (todayTrades.length / 2 * 100) + '%';
    document.getElementById('week-progress').style.width = (weekTrades.length / 8 * 100) + '%';

    // Update win rate color
    const winrateEl = document.getElementById('dash-winrate');
    if (winRate >= 60) {
      winrateEl.classList.add('green');
      winrateEl.classList.remove('red');
    } else {
      winrateEl.classList.add('red');
      winrateEl.classList.remove('green');
    }

    // Update compliance color
    const complianceEl = document.getElementById('dash-compliance');
    if (compliance >= 90) {
      complianceEl.classList.add('green');
      complianceEl.classList.remove('red');
    } else {
      complianceEl.classList.add('red');
      complianceEl.classList.remove('green');
    }

    // Show alert if limits reached
    const alertDiv = document.getElementById('trade-alert');
    if (todayTrades.length >= 2) {
      alertDiv.className = 'trading-alert danger';
      alertDiv.innerHTML = '<strong>⚠️ Daily Limit Reached:</strong> You have completed 2 trades today. No more trading until tomorrow.';
      alertDiv.style.display = 'block';
    } else if (weekTrades.length >= 8) {
      alertDiv.className = 'trading-alert warning';
      alertDiv.innerHTML = '<strong>⚠️ Weekly Limit Reached:</strong> You have completed 8 trades this week. No more trading until next week.';
      alertDiv.style.display = 'block';
    } else {
      alertDiv.style.display = 'none';
    }
  }

  // Display recent trades
  function displayRecentTrades() {
    const trades = loadTrades();
    const container = document.getElementById('recent-trades');

    if (trades.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--trading-text-muted); padding: 2rem;">No recent trades. <a href="/trading-logs" style="color: var(--trading-gold);">Log your first trade</a></p>';
      return;
    }

    const recentTrades = trades.slice(-5).reverse();
    let html = '<table class="trading-table"><thead><tr>';
    html += '<th>Date</th><th>Pair</th><th>Direction</th><th>Outcome</th><th>P&L</th><th>Setup</th>';
    html += '</tr></thead><tbody>';

    recentTrades.forEach(trade => {
      const outcomeClass = trade.outcome === 'win' ? 'green' : trade.outcome === 'loss' ? 'red' : 'gold';
      const directionClass = trade.direction === 'long' ? 'green' : 'red';

      html += `<tr>`;
      html += `<td>${new Date(trade.date).toLocaleDateString()}</td>`;
      html += `<td>${trade.pair}</td>`;
      html += `<td><span class="trading-badge ${directionClass}">${trade.direction.toUpperCase()}</span></td>`;
      html += `<td><span class="trading-badge ${outcomeClass}">${trade.outcome.toUpperCase()}</span></td>`;
      html += `<td style="color: var(--trading-${outcomeClass});">${trade.pnl > 0 ? '+' : ''}${trade.pnl}%</td>`;
      html += `<td>${trade.setupQuality}/5</td>`;
      html += `</tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // Update trading windows status
  function updateTradingWindows() {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const currentTime = utcHours + (utcMinutes / 60);

    // London: 08:00 - 12:00 UTC
    const londonStatus = document.getElementById('london-status');
    if (currentTime >= 8 && currentTime < 12) {
      londonStatus.textContent = 'OPEN';
      londonStatus.className = 'trading-badge green';
    } else {
      londonStatus.textContent = 'Closed';
      londonStatus.className = 'trading-badge red';
    }

    // New York: 13:00 - 17:00 UTC
    const nyStatus = document.getElementById('ny-status');
    if (currentTime >= 13 && currentTime < 17) {
      nyStatus.textContent = 'OPEN';
      nyStatus.className = 'trading-badge green';
    } else {
      nyStatus.textContent = 'Closed';
      nyStatus.className = 'trading-badge red';
    }

    // Update current time
    const timeStr = now.toUTCString().split(' ')[4];
    document.getElementById('current-time').textContent = timeStr + ' UTC';
  }

  // Export all data
  window.exportAllData = function() {
    const trades = loadTrades();
    const reviews = localStorage.getItem('weeklyReviews');

    const data = {
      trades: trades,
      weeklyReviews: reviews ? JSON.parse(reviews) : [],
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading-data-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  // Reset checklist
  window.resetChecklist = function() {
    for (let i = 1; i <= 7; i++) {
      document.getElementById('check' + i).checked = false;
    }
  };

  // Initialize
  calculateStats();
  displayRecentTrades();
  updateTradingWindows();

  // Update time every second
  setInterval(updateTradingWindows, 1000);

  // Refresh stats every 30 seconds
  setInterval(() => {
    calculateStats();
    displayRecentTrades();
  }, 30000);
})();
</script>
