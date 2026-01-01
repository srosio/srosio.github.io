(function() {
  'use strict';

  // Tab management
  document.querySelectorAll('.trading-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');

      // Update active tab
      document.querySelectorAll('.trading-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Update active content
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
    });
  });

  // Initialize range inputs
  const setupQuality = document.getElementById('setup-quality');
  const executionQuality = document.getElementById('execution-quality');
  const emotionalState = document.getElementById('emotional-state');

  setupQuality.addEventListener('input', (e) => {
    document.getElementById('setup-value').textContent = e.target.value;
  });

  executionQuality.addEventListener('input', (e) => {
    document.getElementById('execution-value').textContent = e.target.value;
  });

  emotionalState.addEventListener('input', (e) => {
    document.getElementById('emotional-value').textContent = e.target.value;
  });

  // Set current date/time
  const tradeDateInput = document.getElementById('trade-date');
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  tradeDateInput.value = now.toISOString().slice(0, 16);

  // LocalStorage functions
  function loadTrades() {
    const trades = localStorage.getItem('tradingLogs');
    return trades ? JSON.parse(trades) : [];
  }

  function saveTrades(trades) {
    localStorage.setItem('tradingLogs', JSON.stringify(trades));
  }

  function loadReviews() {
    const reviews = localStorage.getItem('weeklyReviews');
    return reviews ? JSON.parse(reviews) : [];
  }

  function saveReviews(reviews) {
    localStorage.setItem('weeklyReviews', JSON.stringify(reviews));
  }

  // Check trade limits
  function checkLimits() {
    const trades = loadTrades();
    const now = new Date();
    const today = now.toDateString();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());

    const todayTrades = trades.filter(t => new Date(t.date).toDateString() === today);
    const weekTrades = trades.filter(t => new Date(t.date) >= weekStart);

    const warning = document.getElementById('limit-warning');

    if (todayTrades.length >= 2) {
      warning.innerHTML = '<strong>⚠️ DAILY LIMIT REACHED:</strong> You have completed 2 trades today. No more trading until tomorrow.';
      warning.style.display = 'block';
      return false;
    } else if (weekTrades.length >= 8) {
      warning.innerHTML = '<strong>⚠️ WEEKLY LIMIT REACHED:</strong> You have completed 8 trades this week. No more trading until next week.';
      warning.style.display = 'block';
      return false;
    } else {
      warning.style.display = 'none';
      return true;
    }
  }

  // Form submission
  document.getElementById('trade-form').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!checkLimits()) {
      alert('⚠️ Trade limit reached! Cannot log new trade.');
      return;
    }

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
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    tradeDateInput.value = now.toISOString().slice(0, 16);

    displayTrades();
    checkLimits();
  });

  // Clear form
  window.clearForm = function() {
    if (confirm('Clear all form fields?')) {
      document.getElementById('trade-form').reset();
      const now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      tradeDateInput.value = now.toISOString().slice(0, 16);
    }
  };

  // Display trades
  function displayTrades(filteredTrades = null) {
    const trades = filteredTrades || loadTrades();
    const container = document.getElementById('trades-table-container');

    if (trades.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No trades logged yet.</p>';
      return;
    }

    let html = '<table class="trading-table"><thead><tr>';
    html += '<th>Date</th><th>Pair</th><th>Direction</th><th>Outcome</th><th>P&L</th><th>Setup</th><th>Compliance</th><th>Actions</th>';
    html += '</tr></thead><tbody>';

    trades.reverse().forEach((trade, index) => {
      const actualIndex = trades.length - 1 - index;
      const outcomeClass = trade.outcome === 'win' ? 'green' : trade.outcome === 'loss' ? 'red' : 'gold';
      const directionClass = trade.direction === 'long' ? 'green' : 'red';

      const rulesCount = Object.values(trade.rules).filter(r => r).length;
      const complianceColor = rulesCount === 5 ? 'green' : rulesCount >= 3 ? 'gold' : 'red';

      html += `<tr>`;
      html += `<td>${new Date(trade.date).toLocaleDateString()} ${new Date(trade.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>`;
      html += `<td>${trade.pair}</td>`;
      html += `<td><span class="trading-badge ${directionClass}">${trade.direction.toUpperCase()}</span></td>`;
      html += `<td><span class="trading-badge ${outcomeClass}">${trade.outcome.toUpperCase()}</span></td>`;
      html += `<td style="color: var(--trading-${outcomeClass}); font-weight: 600;">${trade.pnl > 0 ? '+' : ''}${trade.pnl}%</td>`;
      html += `<td>${trade.setupQuality}/5</td>`;
      html += `<td><span class="trading-badge ${complianceColor}">${rulesCount}/5</span></td>`;
      html += `<td>`;
      html += `<button onclick="viewTrade(${actualIndex})" class="trading-btn trading-btn-success" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-right: 0.25rem;">View</button>`;
      html += `<button onclick="deleteTrade(${actualIndex})" class="trading-btn trading-btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Delete</button>`;
      html += `</td>`;
      html += `</tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
  }

  // Filter trades
  window.filterTrades = function() {
    const outcomeFilter = document.getElementById('filter-outcome').value;
    const directionFilter = document.getElementById('filter-direction').value;
    const periodFilter = document.getElementById('filter-period').value;

    let trades = loadTrades();
    const now = new Date();

    // Apply filters
    if (outcomeFilter) {
      trades = trades.filter(t => t.outcome === outcomeFilter);
    }

    if (directionFilter) {
      trades = trades.filter(t => t.direction === directionFilter);
    }

    if (periodFilter === 'today') {
      trades = trades.filter(t => new Date(t.date).toDateString() === now.toDateString());
    } else if (periodFilter === 'week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      trades = trades.filter(t => new Date(t.date) >= weekStart);
    } else if (periodFilter === 'month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      trades = trades.filter(t => new Date(t.date) >= monthStart);
    }

    displayTrades(trades);
  };

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
TRADE DETAILS
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

ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━
Setup Quality: ${trade.setupQuality}/5
Setup Type: ${trade.setupType}
Execution Quality: ${trade.executionQuality}/5
Emotional State: ${trade.emotionalState}/5

COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━
Rules Followed (${rulesFollowed.length}/5): ${rulesFollowed.join(', ') || 'None'}

NOTES
━━━━━━━━━━━━━━━━━━━━━━━━
${trade.notes}

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
      checkLimits();
    }
  };

  // Export CSV
  window.exportCSV = function() {
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
  };

  // Clear all trades
  window.clearAllTrades = function() {
    if (confirm('⚠️ WARNING: This will delete ALL trade history. This cannot be undone. Are you sure?')) {
      if (confirm('Really delete everything? Last chance!')) {
        localStorage.removeItem('tradingLogs');
        displayTrades();
        checkLimits();
        alert('All trade history cleared.');
      }
    }
  };

  // Weekly review form
  document.getElementById('review-form').addEventListener('submit', function(e) {
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

  // Display reviews
  function displayReviews() {
    const reviews = loadReviews();
    const container = document.getElementById('reviews-list');

    if (reviews.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No weekly reviews yet.</p>';
      return;
    }

    let html = '';
    reviews.reverse().forEach((review, index) => {
      html += `<div class="trading-card" style="margin-bottom: 1rem;">`;
      html += `<h4 style="color: var(--gold);">Week Ending: ${new Date(review.weekEnding).toLocaleDateString()}</h4>`;
      html += `<p><strong>Best Setup:</strong> ${review.bestSetup}</p>`;
      html += `<p><strong>Worst Mistake:</strong> ${review.worstMistake}</p>`;
      html += `<p><strong>Rules to Add:</strong> ${review.rulesToAdd}</p>`;
      html += `<p><strong>Behaviors to Eliminate:</strong> ${review.behaviorsToEliminate}</p>`;
      html += `<p><strong>Max Risk Next Week:</strong> ${review.maxRisk}%</p>`;
      html += `</div>`;
    });

    container.innerHTML = html;
  }

  // Initialize
  displayTrades();
  displayReviews();
  checkLimits();
})();
