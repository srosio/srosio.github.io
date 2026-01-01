---
layout: default
title: Trading Logs
---

<section class="section fade-up" id="trading-logs">
  <div class="container section-content">
    <div class="section-title">
      <h2>Trading Log</h2>
      <div class="underline"></div>
    </div>

    <div class="about-text">
      <p>Track your trades systematically. Complete this log after EVERY trade (win or lose) before your next trade.</p>
      <p><strong>Remember:</strong> Maximum 2 trades per day, 8 per week, minimum 2 hours between trades.</p>
    </div>

    <!-- Trade Statistics Dashboard -->
    <div class="neon-card" style="margin: 2rem 0; padding: 1.5rem;">
      <h3>Trade Statistics</h3>
      <div id="stats-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
        <div>
          <p><strong>Total Trades:</strong> <span id="stat-total">0</span></p>
        </div>
        <div>
          <p><strong>This Week:</strong> <span id="stat-week">0</span> / 8</p>
        </div>
        <div>
          <p><strong>Today:</strong> <span id="stat-today">0</span> / 2</p>
        </div>
        <div>
          <p><strong>Win Rate:</strong> <span id="stat-winrate">0%</span></p>
        </div>
        <div>
          <p><strong>Avg RR:</strong> <span id="stat-rr">0</span></p>
        </div>
        <div>
          <p><strong>Rule Compliance:</strong> <span id="stat-compliance">0%</span></p>
        </div>
      </div>
    </div>

    <!-- Trade Entry Form -->
    <div class="neon-card" style="margin: 2rem 0; padding: 1.5rem;">
      <h3>New Trade Entry</h3>
      <form id="trade-log-form" style="margin-top: 1.5rem;">

        <!-- Basic Trade Info -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #ff0080; margin-bottom: 1rem;">Trade Information</h4>

          <div style="margin-bottom: 1rem;">
            <label for="trade-date" style="display: block; margin-bottom: 0.5rem;">Date & Time:</label>
            <input type="datetime-local" id="trade-date" name="trade-date" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="trade-pair" style="display: block; margin-bottom: 0.5rem;">Trading Pair:</label>
            <input type="text" id="trade-pair" name="trade-pair" placeholder="e.g., BTC/USDT" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="trade-direction" style="display: block; margin-bottom: 0.5rem;">Direction:</label>
            <select id="trade-direction" name="trade-direction" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
              <option value="">Select direction...</option>
              <option value="long">LONG</option>
              <option value="short">SHORT</option>
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label for="entry-price" style="display: block; margin-bottom: 0.5rem;">Entry Price:</label>
              <input type="number" id="entry-price" name="entry-price" step="0.01" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
            </div>
            <div>
              <label for="exit-price" style="display: block; margin-bottom: 0.5rem;">Exit Price:</label>
              <input type="number" id="exit-price" name="exit-price" step="0.01" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label for="stop-loss" style="display: block; margin-bottom: 0.5rem;">Stop Loss:</label>
              <input type="number" id="stop-loss" name="stop-loss" step="0.01" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
            </div>
            <div>
              <label for="position-size" style="display: block; margin-bottom: 0.5rem;">Position Size (%):</label>
              <input type="number" id="position-size" name="position-size" step="0.1" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="trade-outcome" style="display: block; margin-bottom: 0.5rem;">Outcome:</label>
            <select id="trade-outcome" name="trade-outcome" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
              <option value="">Select outcome...</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Breakeven</option>
            </select>
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="pnl" style="display: block; margin-bottom: 0.5rem;">P&L (%):</label>
            <input type="number" id="pnl" name="pnl" step="0.01" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
          </div>
        </div>

        <!-- Setup Quality -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #ff0080; margin-bottom: 1rem;">Setup Quality</h4>

          <div style="margin-bottom: 1rem;">
            <label for="setup-quality" style="display: block; margin-bottom: 0.5rem;">Setup Quality (1-5):</label>
            <input type="range" id="setup-quality" name="setup-quality" min="1" max="5" value="3" required style="width: 100%;">
            <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
              <span>1</span>
              <span id="setup-quality-value">3</span>
              <span>5</span>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="setup-type" style="display: block; margin-bottom: 0.5rem;">Setup Type:</label>
            <select id="setup-type" name="setup-type" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
              <option value="">Select setup type...</option>
              <option value="a-plus">A+ Setup (All criteria met)</option>
              <option value="b-setup">B Setup (Missing 1 criterion)</option>
              <option value="c-setup">C Setup (Missing 2+ criteria)</option>
            </select>
          </div>
        </div>

        <!-- Rules Compliance -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #ff0080; margin-bottom: 1rem;">Rules Followed (Check all that apply)</h4>

          <div style="margin-bottom: 0.75rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" name="rule-structure" id="rule-structure" style="margin-right: 0.5rem;">
              <span>Structure (15M bias + 5M BOS)</span>
            </label>
          </div>

          <div style="margin-bottom: 0.75rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" name="rule-delta" id="rule-delta" style="margin-right: 0.5rem;">
              <span>Delta Confirmation</span>
            </label>
          </div>

          <div style="margin-bottom: 0.75rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" name="rule-liquidity" id="rule-liquidity" style="margin-right: 0.5rem;">
              <span>Liquidity Sweep</span>
            </label>
          </div>

          <div style="margin-bottom: 0.75rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" name="rule-timing" id="rule-timing" style="margin-right: 0.5rem;">
              <span>Trading Window (London/NY sessions)</span>
            </label>
          </div>

          <div style="margin-bottom: 0.75rem;">
            <label style="display: flex; align-items: center; cursor: pointer;">
              <input type="checkbox" name="rule-position" id="rule-position" style="margin-right: 0.5rem;">
              <span>Position Sizing (<2% stop distance)</span>
            </label>
          </div>
        </div>

        <!-- Execution Quality -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #ff0080; margin-bottom: 1rem;">Execution & Psychology</h4>

          <div style="margin-bottom: 1rem;">
            <label for="execution-quality" style="display: block; margin-bottom: 0.5rem;">Execution Quality (1-5):</label>
            <input type="range" id="execution-quality" name="execution-quality" min="1" max="5" value="3" required style="width: 100%;">
            <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
              <span>1 - Poor</span>
              <span id="execution-quality-value">3</span>
              <span>5 - Perfect</span>
            </div>
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="emotional-state" style="display: block; margin-bottom: 0.5rem;">Emotional State (1-5, 5=calm):</label>
            <input type="range" id="emotional-state" name="emotional-state" min="1" max="5" value="3" required style="width: 100%;">
            <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
              <span>1 - Emotional</span>
              <span id="emotional-state-value">3</span>
              <span>5 - Calm</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="color: #ff0080; margin-bottom: 1rem;">Review Notes</h4>

          <div style="margin-bottom: 1rem;">
            <label for="trade-notes" style="display: block; margin-bottom: 0.5rem;">What would I do differently?</label>
            <textarea id="trade-notes" name="trade-notes" rows="4" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px; resize: vertical;"></textarea>
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="screenshot-url" style="display: block; margin-bottom: 0.5rem;">Screenshot URL (optional):</label>
            <input type="url" id="screenshot-url" name="screenshot-url" placeholder="https://..." style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
          </div>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button type="submit" class="btn-primary neon-btn" style="flex: 1;">Save Trade Log</button>
          <button type="button" id="clear-form" class="btn-primary" style="flex: 1; background: rgba(255,0,0,0.2); border: 1px solid #ff0080;">Clear Form</button>
        </div>
      </form>
    </div>

    <!-- Trade History -->
    <div class="neon-card" style="margin: 2rem 0; padding: 1.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3>Trade History</h3>
        <div style="display: flex; gap: 1rem;">
          <button id="export-trades" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Export CSV</button>
          <button id="clear-history" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; background: rgba(255,0,0,0.2);">Clear All</button>
        </div>
      </div>
      <div id="trade-history" style="overflow-x: auto;">
        <p style="text-align: center; color: #888;">No trades logged yet. Start by adding your first trade above.</p>
      </div>
    </div>

    <!-- Weekly Review Section -->
    <div class="neon-card" style="margin: 2rem 0; padding: 1.5rem;">
      <h3>Weekly Review Template</h3>
      <p style="margin-top: 1rem; color: #888;">Complete this every Sunday (30 min):</p>

      <form id="weekly-review-form" style="margin-top: 1.5rem;">
        <div style="margin-bottom: 1rem;">
          <label for="review-week" style="display: block; margin-bottom: 0.5rem;">Week Ending:</label>
          <input type="date" id="review-week" name="review-week" required style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="best-setup" style="display: block; margin-bottom: 0.5rem;">Best Setup Type This Week:</label>
          <input type="text" id="best-setup" name="best-setup" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="worst-mistake" style="display: block; margin-bottom: 0.5rem;">Worst Mistake Repeated:</label>
          <input type="text" id="worst-mistake" name="worst-mistake" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="rules-to-add" style="display: block; margin-bottom: 0.5rem;">Rules to Add Next Week:</label>
          <textarea id="rules-to-add" name="rules-to-add" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px; resize: vertical;"></textarea>
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="behaviors-to-eliminate" style="display: block; margin-bottom: 0.5rem;">Behaviors to Eliminate:</label>
          <textarea id="behaviors-to-eliminate" name="behaviors-to-eliminate" rows="3" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px; resize: vertical;"></textarea>
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="max-risk" style="display: block; margin-bottom: 0.5rem;">Max Risk Per Trade Next Week (%):</label>
          <input type="number" id="max-risk" name="max-risk" step="0.1" style="width: 100%; padding: 0.75rem; background: rgba(0,0,0,0.5); border: 1px solid #ff0080; color: #fff; border-radius: 4px;">
        </div>

        <button type="submit" class="btn-primary neon-btn" style="width: 100%;">Save Weekly Review</button>
      </form>

      <div id="weekly-reviews" style="margin-top: 2rem;">
        <h4>Past Reviews</h4>
        <div id="reviews-list" style="margin-top: 1rem;">
          <p style="text-align: center; color: #888;">No weekly reviews yet.</p>
        </div>
      </div>
    </div>

    <div style="margin-top: 3rem; text-align: center;">
      <a href="/trading-systems" class="btn-primary neon-btn">View Trading Systems Documentation</a>
    </div>
  </div>
</section>

<script>
// Trading Log Management System
(function() {
  'use strict';

  // Initialize range inputs display
  const setupQuality = document.getElementById('setup-quality');
  const setupQualityValue = document.getElementById('setup-quality-value');
  const executionQuality = document.getElementById('execution-quality');
  const executionQualityValue = document.getElementById('execution-quality-value');
  const emotionalState = document.getElementById('emotional-state');
  const emotionalStateValue = document.getElementById('emotional-state-value');

  setupQuality.addEventListener('input', (e) => {
    setupQualityValue.textContent = e.target.value;
  });

  executionQuality.addEventListener('input', (e) => {
    executionQualityValue.textContent = e.target.value;
  });

  emotionalState.addEventListener('input', (e) => {
    emotionalStateValue.textContent = e.target.value;
  });

  // Set current date/time on load
  const tradeDateInput = document.getElementById('trade-date');
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  tradeDateInput.value = now.toISOString().slice(0, 16);

  // Load trades from localStorage
  function loadTrades() {
    const trades = localStorage.getItem('tradingLogs');
    return trades ? JSON.parse(trades) : [];
  }

  // Save trades to localStorage
  function saveTrades(trades) {
    localStorage.setItem('tradingLogs', JSON.stringify(trades));
  }

  // Load weekly reviews from localStorage
  function loadReviews() {
    const reviews = localStorage.getItem('weeklyReviews');
    return reviews ? JSON.parse(reviews) : [];
  }

  // Save weekly reviews to localStorage
  function saveReviews(reviews) {
    localStorage.setItem('weeklyReviews', JSON.stringify(reviews));
  }

  // Calculate statistics
  function calculateStats() {
    const trades = loadTrades();
    const now = new Date();
    const today = now.toDateString();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)

    const todayTrades = trades.filter(t => new Date(t.date).toDateString() === today);
    const weekTrades = trades.filter(t => new Date(t.date) >= weekStart);
    const wins = trades.filter(t => t.outcome === 'win').length;
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
      totalRules += 5; // 5 rules to check
      if (t.rules.structure) followedRules++;
      if (t.rules.delta) followedRules++;
      if (t.rules.liquidity) followedRules++;
      if (t.rules.timing) followedRules++;
      if (t.rules.position) followedRules++;
    });
    const compliance = totalRules > 0 ? ((followedRules / totalRules) * 100).toFixed(1) : 0;

    // Update display
    document.getElementById('stat-total').textContent = trades.length;
    document.getElementById('stat-week').textContent = weekTrades.length;
    document.getElementById('stat-today').textContent = todayTrades.length;
    document.getElementById('stat-winrate').textContent = winRate + '%';
    document.getElementById('stat-rr').textContent = avgRR;
    document.getElementById('stat-compliance').textContent = compliance + '%';

    // Check trade limits
    if (todayTrades.length >= 2) {
      alert('⚠️ WARNING: You have reached your daily limit of 2 trades!');
    }
    if (weekTrades.length >= 8) {
      alert('⚠️ WARNING: You have reached your weekly limit of 8 trades!');
    }
  }

  // Display trade history
  function displayTrades() {
    const trades = loadTrades();
    const container = document.getElementById('trade-history');

    if (trades.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #888;">No trades logged yet. Start by adding your first trade above.</p>';
      return;
    }

    let html = '<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">';
    html += '<thead><tr style="border-bottom: 2px solid #ff0080;">';
    html += '<th style="padding: 0.75rem; text-align: left;">Date</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Pair</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Direction</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Outcome</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">P&L%</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Setup</th>';
    html += '<th style="padding: 0.75rem; text-align: left;">Actions</th>';
    html += '</tr></thead><tbody>';

    trades.reverse().forEach((trade, index) => {
      const actualIndex = trades.length - 1 - index;
      const outcomeColor = trade.outcome === 'win' ? '#00ff88' : trade.outcome === 'loss' ? '#ff0080' : '#ffaa00';
      const directionColor = trade.direction === 'long' ? '#00ff88' : '#ff0080';

      html += `<tr style="border-bottom: 1px solid rgba(255,0,128,0.2);">`;
      html += `<td style="padding: 0.75rem;">${new Date(trade.date).toLocaleDateString()}</td>`;
      html += `<td style="padding: 0.75rem;">${trade.pair}</td>`;
      html += `<td style="padding: 0.75rem; color: ${directionColor};">${trade.direction.toUpperCase()}</td>`;
      html += `<td style="padding: 0.75rem; color: ${outcomeColor};">${trade.outcome.toUpperCase()}</td>`;
      html += `<td style="padding: 0.75rem; color: ${outcomeColor};">${trade.pnl > 0 ? '+' : ''}${trade.pnl}%</td>`;
      html += `<td style="padding: 0.75rem;">${trade.setupQuality}/5</td>`;
      html += `<td style="padding: 0.75rem;">`;
      html += `<button onclick="viewTrade(${actualIndex})" style="padding: 0.25rem 0.5rem; background: rgba(0,255,136,0.2); border: 1px solid #00ff88; color: #00ff88; border-radius: 4px; cursor: pointer; margin-right: 0.5rem;">View</button>`;
      html += `<button onclick="deleteTrade(${actualIndex})" style="padding: 0.25rem 0.5rem; background: rgba(255,0,128,0.2); border: 1px solid #ff0080; color: #ff0080; border-radius: 4px; cursor: pointer;">Delete</button>`;
      html += `</td>`;
      html += `</tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // View trade details
  window.viewTrade = function(index) {
    const trades = loadTrades();
    const trade = trades[index];

    let rulesFollowed = [];
    if (trade.rules.structure) rulesFollowed.push('Structure');
    if (trade.rules.delta) rulesFollowed.push('Delta');
    if (trade.rules.liquidity) rulesFollowed.push('Liquidity');
    if (trade.rules.timing) rulesFollowed.push('Timing');
    if (trade.rules.position) rulesFollowed.push('Position Sizing');

    const details = `
Trade Details:
━━━━━━━━━━━━━━━━━━━━━━━━
Date: ${new Date(trade.date).toLocaleString()}
Pair: ${trade.pair}
Direction: ${trade.direction.toUpperCase()}
Entry: ${trade.entryPrice}
Exit: ${trade.exitPrice}
Stop Loss: ${trade.stopLoss}
Position Size: ${trade.positionSize}%
Outcome: ${trade.outcome.toUpperCase()}
P&L: ${trade.pnl}%

Setup Quality: ${trade.setupQuality}/5
Setup Type: ${trade.setupType}
Execution Quality: ${trade.executionQuality}/5
Emotional State: ${trade.emotionalState}/5

Rules Followed: ${rulesFollowed.join(', ') || 'None'}

Notes: ${trade.notes}

${trade.screenshot ? 'Screenshot: ' + trade.screenshot : ''}
    `;

    alert(details);
  };

  // Delete trade
  window.deleteTrade = function(index) {
    if (confirm('Are you sure you want to delete this trade?')) {
      const trades = loadTrades();
      trades.splice(index, 1);
      saveTrades(trades);
      displayTrades();
      calculateStats();
    }
  };

  // Handle form submission
  document.getElementById('trade-log-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const trade = {
      date: document.getElementById('trade-date').value,
      pair: document.getElementById('trade-pair').value,
      direction: document.getElementById('trade-direction').value,
      entryPrice: document.getElementById('entry-price').value,
      exitPrice: document.getElementById('exit-price').value,
      stopLoss: document.getElementById('stop-loss').value,
      positionSize: document.getElementById('position-size').value,
      outcome: document.getElementById('trade-outcome').value,
      pnl: parseFloat(document.getElementById('pnl').value),
      setupQuality: document.getElementById('setup-quality').value,
      setupType: document.getElementById('setup-type').value,
      rules: {
        structure: document.getElementById('rule-structure').checked,
        delta: document.getElementById('rule-delta').checked,
        liquidity: document.getElementById('rule-liquidity').checked,
        timing: document.getElementById('rule-timing').checked,
        position: document.getElementById('rule-position').checked
      },
      executionQuality: document.getElementById('execution-quality').value,
      emotionalState: document.getElementById('emotional-state').value,
      notes: document.getElementById('trade-notes').value,
      screenshot: document.getElementById('screenshot-url').value
    };

    const trades = loadTrades();
    trades.push(trade);
    saveTrades(trades);

    alert('✅ Trade logged successfully! Remember: 2 hour cooling period before next trade.');

    this.reset();
    // Reset date to current time
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    tradeDateInput.value = now.toISOString().slice(0, 16);

    displayTrades();
    calculateStats();
  });

  // Clear form
  document.getElementById('clear-form').addEventListener('click', function() {
    if (confirm('Clear all form fields?')) {
      document.getElementById('trade-log-form').reset();
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      tradeDateInput.value = now.toISOString().slice(0, 16);
    }
  });

  // Export to CSV
  document.getElementById('export-trades').addEventListener('click', function() {
    const trades = loadTrades();
    if (trades.length === 0) {
      alert('No trades to export!');
      return;
    }

    let csv = 'Date,Pair,Direction,Entry,Exit,Stop Loss,Position Size,Outcome,P&L,Setup Quality,Setup Type,Execution Quality,Emotional State,Structure,Delta,Liquidity,Timing,Position Sizing,Notes\n';

    trades.forEach(trade => {
      csv += `${trade.date},${trade.pair},${trade.direction},${trade.entryPrice},${trade.exitPrice},${trade.stopLoss},${trade.positionSize},${trade.outcome},${trade.pnl},${trade.setupQuality},${trade.setupType},${trade.executionQuality},${trade.emotionalState},${trade.rules.structure},${trade.rules.delta},${trade.rules.liquidity},${trade.rules.timing},${trade.rules.position},"${trade.notes.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trading-logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  });

  // Clear all history
  document.getElementById('clear-history').addEventListener('click', function() {
    if (confirm('⚠️ WARNING: This will delete ALL trade history. This cannot be undone. Are you sure?')) {
      if (confirm('Really delete everything? Last chance!')) {
        localStorage.removeItem('tradingLogs');
        displayTrades();
        calculateStats();
        alert('All trade history cleared.');
      }
    }
  });

  // Weekly review form
  document.getElementById('weekly-review-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const review = {
      weekEnding: document.getElementById('review-week').value,
      bestSetup: document.getElementById('best-setup').value,
      worstMistake: document.getElementById('worst-mistake').value,
      rulesToAdd: document.getElementById('rules-to-add').value,
      behaviorsToEliminate: document.getElementById('behaviors-to-eliminate').value,
      maxRisk: document.getElementById('max-risk').value,
      date: new Date().toISOString()
    };

    const reviews = loadReviews();
    reviews.push(review);
    saveReviews(reviews);

    alert('✅ Weekly review saved!');
    this.reset();
    displayReviews();
  });

  // Display weekly reviews
  function displayReviews() {
    const reviews = loadReviews();
    const container = document.getElementById('reviews-list');

    if (reviews.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #888;">No weekly reviews yet.</p>';
      return;
    }

    let html = '';
    reviews.reverse().forEach((review, index) => {
      html += `<div class="neon-card" style="margin-bottom: 1rem; padding: 1rem;">`;
      html += `<h4>Week Ending: ${new Date(review.weekEnding).toLocaleDateString()}</h4>`;
      html += `<p><strong>Best Setup:</strong> ${review.bestSetup}</p>`;
      html += `<p><strong>Worst Mistake:</strong> ${review.worstMistake}</p>`;
      html += `<p><strong>Rules to Add:</strong> ${review.rulesToAdd}</p>`;
      html += `<p><strong>Behaviors to Eliminate:</strong> ${review.behaviorsToEliminate}</p>`;
      html += `<p><strong>Max Risk Next Week:</strong> ${review.maxRisk}%</p>`;
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // Initialize on load
  displayTrades();
  calculateStats();
  displayReviews();
})();
</script>
