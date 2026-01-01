---
layout: default
title: Trading Logs
---

<link rel="stylesheet" href="/assets/css/trading.css">
<script>document.body.classList.add('trading-page');</script>

<div class="trading-header">
  <div class="container">
    <h1>📝 Trading Log Terminal</h1>
    <p>Track every trade. Follow the system. Build consistency.</p>
  </div>
</div>

<div class="container">
  <!-- Tabs -->
  <div class="trading-tabs">
    <button class="trading-tab active" data-tab="log-trade">Log New Trade</button>
    <button class="trading-tab" data-tab="trade-history">Trade History</button>
    <button class="trading-tab" data-tab="weekly-review">Weekly Review</button>
  </div>

  <!-- Tab: Log New Trade -->
  <div class="tab-content active" id="log-trade">
    <div class="trading-alert warning" id="limit-warning" style="display: none;"></div>

    <form id="trade-form" class="trading-card">
      <h3 style="margin-bottom: 2rem;">New Trade Entry</h3>

      <!-- Trade Basic Info -->
      <div style="margin-bottom: 2rem;">
        <h4 style="color: var(--gold); margin-bottom: 1rem;">Trade Information</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div class="trading-form-group">
            <label class="trading-label">Date & Time</label>
            <input type="datetime-local" id="trade-date" class="trading-input" required>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Trading Pair</label>
            <input type="text" id="trade-pair" class="trading-input" placeholder="BTC/USDT" required>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Direction</label>
            <select id="trade-direction" class="trading-select" required>
              <option value="">Select...</option>
              <option value="long">LONG</option>
              <option value="short">SHORT</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem;">
          <div class="trading-form-group">
            <label class="trading-label">Entry Price</label>
            <input type="number" id="entry-price" class="trading-input" step="0.01" required>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Exit Price</label>
            <input type="number" id="exit-price" class="trading-input" step="0.01" required>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Stop Loss</label>
            <input type="number" id="stop-loss" class="trading-input" step="0.01" required>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Position Size (%)</label>
            <input type="number" id="position-size" class="trading-input" step="0.1" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <div class="trading-form-group">
            <label class="trading-label">Outcome</label>
            <select id="trade-outcome" class="trading-select" required>
              <option value="">Select...</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Breakeven</option>
            </select>
          </div>
          <div class="trading-form-group">
            <label class="trading-label">P&L (%)</label>
            <input type="number" id="pnl" class="trading-input" step="0.01" required>
          </div>
        </div>
      </div>

      <!-- Setup Quality -->
      <div style="margin-bottom: 2rem;">
        <h4 style="color: var(--gold); margin-bottom: 1rem;">Setup Analysis</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="trading-form-group">
            <label class="trading-label">Setup Quality: <span id="setup-value">3</span>/5</label>
            <input type="range" id="setup-quality" class="trading-range" min="1" max="5" value="3">
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Setup Type</label>
            <select id="setup-type" class="trading-select" required>
              <option value="">Select...</option>
              <option value="a-plus">A+ Setup (All criteria met)</option>
              <option value="b-setup">B Setup (Missing 1 criterion)</option>
              <option value="c-setup">C Setup (Missing 2+ criteria)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Rules Compliance -->
      <div style="margin-bottom: 2rem;">
        <h4 style="color: var(--gold); margin-bottom: 1rem;">Rules Compliance</h4>
        <div class="trading-checklist">
          <label class="trading-checkbox">
            <input type="checkbox" id="rule-structure">
            <span>15M Structure + 5M BOS</span>
          </label>
          <label class="trading-checkbox">
            <input type="checkbox" id="rule-delta">
            <span>Delta Confirmation</span>
          </label>
          <label class="trading-checkbox">
            <input type="checkbox" id="rule-liquidity">
            <span>Liquidity Sweep</span>
          </label>
          <label class="trading-checkbox">
            <input type="checkbox" id="rule-timing">
            <span>Trading Window (London/NY)</span>
          </label>
          <label class="trading-checkbox">
            <input type="checkbox" id="rule-position">
            <span>Position Sizing (<2% stop)</span>
          </label>
        </div>
      </div>

      <!-- Execution & Psychology -->
      <div style="margin-bottom: 2rem;">
        <h4 style="color: var(--gold); margin-bottom: 1rem;">Execution & Psychology</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div class="trading-form-group">
            <label class="trading-label">Execution Quality: <span id="execution-value">3</span>/5</label>
            <input type="range" id="execution-quality" class="trading-range" min="1" max="5" value="3">
          </div>
          <div class="trading-form-group">
            <label class="trading-label">Emotional State: <span id="emotional-value">3</span>/5 (5=calm)</label>
            <input type="range" id="emotional-state" class="trading-range" min="1" max="5" value="3">
          </div>
        </div>
        <div class="trading-form-group">
          <label class="trading-label">What would I do differently?</label>
          <textarea id="trade-notes" class="trading-textarea" rows="4" required></textarea>
        </div>
        <div class="trading-form-group">
          <label class="trading-label">Screenshot URL (optional)</label>
          <input type="url" id="screenshot-url" class="trading-input" placeholder="https://...">
        </div>
      </div>

      <!-- Submit -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <button type="submit" class="trading-btn trading-btn-primary">Save Trade Log</button>
        <button type="button" onclick="clearForm()" class="trading-btn trading-btn-secondary">Clear Form</button>
      </div>
    </form>

    <div class="trading-alert info" style="margin-top: 2rem;">
      <strong>Remember:</strong> 2 hour cooling period before next trade. Set your alarm now!
    </div>
  </div>

  <!-- Tab: Trade History -->
  <div class="tab-content" id="trade-history">
    <div class="trading-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h3>Trade History</h3>
        <div style="display: flex; gap: 1rem;">
          <button onclick="exportCSV()" class="trading-btn trading-btn-success">Export CSV</button>
          <button onclick="clearAllTrades()" class="trading-btn trading-btn-danger">Clear All</button>
        </div>
      </div>

      <!-- Filters -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <select id="filter-outcome" class="trading-select" onchange="filterTrades()">
          <option value="">All Outcomes</option>
          <option value="win">Wins Only</option>
          <option value="loss">Losses Only</option>
          <option value="breakeven">Breakeven Only</option>
        </select>
        <select id="filter-direction" class="trading-select" onchange="filterTrades()">
          <option value="">All Directions</option>
          <option value="long">Longs Only</option>
          <option value="short">Shorts Only</option>
        </select>
        <select id="filter-period" class="trading-select" onchange="filterTrades()">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div id="trades-table-container" style="overflow-x: auto;"></div>
    </div>
  </div>

  <!-- Tab: Weekly Review -->
  <div class="tab-content" id="weekly-review">
    <div class="trading-card">
      <h3 style="margin-bottom: 2rem;">Weekly Review Template</h3>
      <p style="color: var(--text-muted); margin-bottom: 2rem;">Complete this every Sunday (30 min)</p>

      <form id="review-form">
        <div class="trading-form-group">
          <label class="trading-label">Week Ending</label>
          <input type="date" id="review-week" class="trading-input" required>
        </div>

        <div class="trading-form-group">
          <label class="trading-label">Best Setup Type This Week</label>
          <input type="text" id="best-setup" class="trading-input">
        </div>

        <div class="trading-form-group">
          <label class="trading-label">Worst Mistake Repeated</label>
          <input type="text" id="worst-mistake" class="trading-input">
        </div>

        <div class="trading-form-group">
          <label class="trading-label">Rules to Add Next Week</label>
          <textarea id="rules-to-add" class="trading-textarea" rows="3"></textarea>
        </div>

        <div class="trading-form-group">
          <label class="trading-label">Behaviors to Eliminate</label>
          <textarea id="behaviors-to-eliminate" class="trading-textarea" rows="3"></textarea>
        </div>

        <div class="trading-form-group">
          <label class="trading-label">Max Risk Per Trade Next Week (%)</label>
          <input type="number" id="max-risk" class="trading-input" step="0.1">
        </div>

        <button type="submit" class="trading-btn trading-btn-primary" style="width: 100%;">Save Weekly Review</button>
      </form>
    </div>

    <div class="trading-card" style="margin-top: 2rem;">
      <h3 style="margin-bottom: 2rem;">Past Reviews</h3>
      <div id="reviews-list"></div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 3rem;">
    <a href="/trading-dashboard" class="trading-btn trading-btn-secondary" style="text-decoration: none; display: inline-block; margin-right: 1rem;">
      ← Back to Dashboard
    </a>
    <a href="/trading-systems" class="trading-btn trading-btn-secondary" style="text-decoration: none; display: inline-block;">
      View Trading Systems →
    </a>
  </div>
</div>

<script src="/assets/js/trading-logs.js"></script>
