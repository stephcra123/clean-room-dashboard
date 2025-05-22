
channelData.forEach(channel => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <span class="channel-indicator" style="background-color: ${channel.color}"></span>
            ${channel.channel}
        </td>
        <td>${(channel.audience/1000000).toFixed(1)}M</td>
        <td style="color: #059669; font-weight: 600;">${channel.roas}x</td>
        <td>${(channel.salesRate * 100).toFixed(1)}%</td>
        <td>${(channel.exposed/1000000).toFixed(1)}M</td>
        <td>${(channel.unexposed/1000000).toFixed(1)}M</td>
        <td style="color: #3B82F6; font-weight: 600;">+${channel.lift}%</td>
        <td style="color: #8B5CF6; font-weight: 600;">+${channel.liftVsUnexposed}%</td>
    `;
    tbody.appendChild(row);
});
}

// Control functions
function selectPeriod(element, period) {
// Remove active class from all control items
document.querySelectorAll('.control-item').forEach(item => {
    item.classList.remove('active');
});

// Add active class to selected item
element.classList.add('active');

// Update data based on selected period
updateDashboardData(period);

console.log('Selected period:', period);
}

function updateDashboardData(period) {
// This function would typically fetch new data based on the selected period
// For demo purposes, we'll just log the action
console.log('Updating dashboard data for period:', period);

// You could add logic here to:
// 1. Fetch new data from API
// 2. Update chart data
// 3. Refresh metric cards
// 4. Update table data
}

function exportReport() {
// Create a simple CSV export of channel data
const csvData = [
    ['Channel', 'Audience', 'ROAS', 'Sales Rate', 'Exposed', 'Unexposed', 'Lift vs Control', 'Lift vs Unexposed'],
    ...channelData.map(channel => [
        channel.channel,
        channel.audience,
        channel.roas,
        (channel.salesRate * 100).toFixed(1) + '%',
        channel.exposed,
        channel.unexposed,
        '+' + channel.lift + '%',
        '+' + channel.liftVsUnexposed + '%'
    ])
];

const csvContent = csvData.map(row => row.join(',')).join('\n');
const blob = new Blob([csvContent], { type: 'text/csv' });
const url = window.URL.createObjectURL(blob);

const a = document.createElement('a');
a.href = url;
a.download = 'attribution-report.csv';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
window.URL.revokeObjectURL(url);

console.log('Report exported successfully');
}

// Metric calculation functions
function calculateTotalAudience() {
return channelData.reduce((total, channel) => total + channel.audience, 0);
}

function calculateBlendedROAS() {
const totalRevenue = channelData.reduce((total, channel) => total + (channel.audience * channel.roas), 0);
const totalSpend = channelData.reduce((total, channel) => total + channel.audience, 0);
return (totalRevenue / totalSpend).toFixed(1);
}

function calculateAverageSalesRate() {
const totalSales = channelData.reduce((total, channel) => total + (channel.audience * channel.salesRate), 0);
const totalAudience = calculateTotalAudience();
return ((totalSales / totalAudience) * 100).toFixed(1);
}

function calculateAttributionLift() {
const averageLift = channelData.reduce((total, channel) => total + channel.lift, 0) / channelData.length;
return averageLift.toFixed(1);
}

// Animation functions
function animateMetricCards() {
const cards = document.querySelectorAll('.metric-card');
cards.forEach((card, index) => {
    setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }, index * 150);
});
}

// Utility functions
function formatNumber(num) {
if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
} else if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
}
return num.toString();
}

function formatCurrency(num) {
return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
}).format(num);
}

function formatPercentage(num) {
return (num * 100).toFixed(1) + '%';
}

// Main initialization function
function initializeDashboard() {
try {
    // Initialize all charts
    initROASChart();
    initJourneyChart();
    initAttributionChart();
    
    // Populate data tables
    populateChannelTable();
    
    // Animate metric cards
    setTimeout(animateMetricCards, 500);
    
    console.log('Dashboard initialized successfully');
} catch (error) {
    console.error('Error initializing dashboard:', error);
}
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
initializeDashboard();
});

// Window load event for chart initialization
window.addEventListener('load', function() {
// Ensure charts are properly sized after all resources are loaded
setTimeout(() => {
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
}, 100);
});

// Resize event handler
window.addEventListener('resize', function() {
// Debounce resize events
clearTimeout(window.resizeTimeout);
window.resizeTimeout = setTimeout(() => {
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.resize();
    });
}, 250);
});

// Export functions for external use
window.DashboardAPI = {
exportReport,
selectPeriod,
calculateTotalAudience,
calculateBlendedROAS,
calculateAverageSalesRate,
calculateAttributionLift,
formatNumber,
formatCurrency,
formatPercentage,
channelData,
journeyData,
attributionData,
holdoutData
};