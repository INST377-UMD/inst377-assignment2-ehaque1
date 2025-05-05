// Chart initialization
let stockChart = null;
const ctx = document.getElementById('stockChart').getContext('2d');
stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Stock Price',
            data: [],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.1,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Stock Price History',
                font: {
                    size: 16
                }
            }
        }
    }
});

// DOM Elements
const tickerInput = document.getElementById('stockTicker');
const fetchBtn = document.getElementById('fetchStock');
const errorMsg = document.getElementById('errorMessage');

// Event Listeners
fetchBtn.addEventListener('click', fetchStockData);
tickerInput.addEventListener('input', validateTicker);

// Validate ticker input
function validateTicker() {
    const ticker = tickerInput.value.trim();
    if (ticker.length > 5) {
        errorMsg.textContent = 'Ticker must be 5 characters or less';
        return false;
    }
    errorMsg.textContent = '';
    return true;
}

// Fetch stock data
function fetchStockData() {
    if (!validateTicker()) return;
    
    const ticker = tickerInput.value.trim().toUpperCase();
    const days = document.getElementById('daysRange').value;
    
    if (!ticker) {
        errorMsg.textContent = 'Please enter a stock ticker';
        return;
    }

    // Simulate API call (replace with actual Polygon.io API call)
    simulateStockData(ticker, days);
    
    // Load sentiment table
    loadSentimentTable();
}

// Simulate stock data (replace with actual API call)
function simulateStockData(ticker, days) {
    // Generate random stock data for demonstration
    const dates = [];
    const prices = [];
    const basePrice = Math.random() * 100 + 50;
    
    for (let i = 0; i < days; i++) {
        dates.push(`Day ${i+1}`);
        prices.push(basePrice + Math.random() * 20 - 10);
    }
    
    // Update chart
    stockChart.data.labels = dates;
    stockChart.data.datasets[0].data = prices;
    stockChart.data.datasets[0].label = `${ticker} Price`;
    stockChart.update();
}

// Load sentiment table
function loadSentimentTable() {
    // Sample data - replace with API call to tradestie.com
    const sentimentData = [
        { ticker: 'AMC', comments: 53, sentiment: 'bullish' },
        { ticker: 'GME', comments: 42, sentiment: 'bullish' },
        { ticker: 'TSLA', comments: 35, sentiment: 'bearish' },
        { ticker: 'AAPL', comments: 28, sentiment: 'bullish' },
        { ticker: 'NVDA', comments: 22, sentiment: 'bearish' }
    ];

    const tableBody = document.querySelector('#redditStocksTable tbody');
    tableBody.innerHTML = '';

    sentimentData.forEach(stock => {
        const row = document.createElement('tr');
        
        // Ticker with link
        const tickerCell = document.createElement('td');
        const tickerLink = document.createElement('a');
        tickerLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        tickerLink.textContent = stock.ticker;
        tickerLink.target = '_blank';
        tickerCell.appendChild(tickerLink);
        
        // Comment count
        const commentsCell = document.createElement('td');
        commentsCell.textContent = stock.comments;
        
        // Sentiment with icon
        const sentimentCell = document.createElement('td');
        const icon = document.createElement('img');
        icon.className = 'sentiment-icon';
        icon.alt = stock.sentiment;
        icon.src = stock.sentiment === 'bullish' 
            ? 'https://imagedelivery.net/4-5JC1r3VHAXpnrwWHBHRQ/589fd70e-dfe5-498a-d9b4-a9363fdd7e00/w=100,h=100,fit=cover' 
            : 'https://example.com/bearish-icon.jpg';
        sentimentCell.appendChild(icon);
        sentimentCell.innerHTML += stock.sentiment.charAt(0).toUpperCase() + stock.sentiment.slice(1);
        
        row.appendChild(tickerCell);
        row.appendChild(commentsCell);
        row.appendChild(sentimentCell);
        tableBody.appendChild(row);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadSentimentTable();
});