// Dashboard Analytics JavaScript
// Requires Chart.js to be loaded: https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js

// Global chart configuration
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#6b7280';

// Color palette
const chartColors = {
    primary: '#3b82f6',
    secondary: '#10b981',
    tertiary: '#f59e0b',
    quaternary: '#ef4444',
    quinary: '#8b5cf6',
    gradients: {
        primary: 'rgba(59, 130, 246, 0.1)',
        secondary: 'rgba(16, 185, 129, 0.1)',
        tertiary: 'rgba(245, 158, 11, 0.1)'
    }
};

// Data for all charts
const dashboardData = {
    journey: {
        labels: ['Awareness', 'Interest', 'Consideration', 'Purchase', 'Retention'],
        visitors: [10000, 8000, 6000, 3000, 2400],
        conversionRates: [8, 15, 30, 80, 70]
    },
    channels: {
        labels: ['Organic Search', 'Paid Search', 'Social Media', 'Email', 'Display'],
        conversions: [450, 380, 320, 180, 70],
        colors: [chartColors.primary, chartColors.secondary, chartColors.tertiary, chartColors.quaternary, chartColors.quinary]
    },
    campaigns: {
        labels: ['Summer Sale 2024', 'Black Friday Blitz', 'New Collection Launch', 'Holiday Specials'],
        attribution: [32, 28, 21, 19],
        colors: [chartColors.primary, chartColors.secondary, chartColors.tertiary, chartColors.quaternary]
    },
    roas: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        loyalShoppers: [8.2, 8.8, 9.1, 9.5, 10.2],
        firstTimeBuyers: [5.1, 5.8, 6.2, 6.7, 7.1],
        highValueCustomers: [12.5, 13.2, 14.1, 14.8, 15.6]
    },
    cohort: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        newCustomers: [1200, 1350, 1100, 1450, 1600],
        returningCustomers: [800, 950, 850, 1100, 1250],
        retentionRates: [67, 70, 77, 76, 78]
    }
};

// Chart initialization functions
function initializeJourneyChart() {
    const ctx = document.getElementById('journeyChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dashboardData.journey.labels,
            datasets: [{
                label: 'Visitors',
                data: dashboardData.journey.visitors,
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Conversion Rate %',
                data: dashboardData.journey.conversionRates,
                backgroundColor: chartColors.tertiary,
                borderColor: chartColors.tertiary,
                borderWidth: 2,
                type: 'line',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Visitors'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Conversion Rate %'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

function initializeChannelChart() {
    const ctx = document.getElementById('channelChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dashboardData.channels.labels,
            datasets: [{
                label: 'Conversions',
                data: dashboardData.channels.conversions,
                backgroundColor: dashboardData.channels.colors,
                borderColor: dashboardData.channels.colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Conversions'
                    }
                }
            }
        }
    });
}

function initializeCampaignChart() {
    const ctx = document.getElementById('campaignChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.campaigns.labels,
            datasets: [{
                data: dashboardData.campaigns.attribution,
                backgroundColor: dashboardData.campaigns.colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

function initializeRoasChart() {
    const ctx = document.getElementById('roasChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dashboardData.roas.labels,
            datasets: [{
                label: 'Loyal Shoppers',
                data: dashboardData.roas.loyalShoppers,
                borderColor: chartColors.primary,
                backgroundColor: chartColors.gradients.primary,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'First Time Buyers',
                data: dashboardData.roas.firstTimeBuyers,
                borderColor: chartColors.secondary,
                backgroundColor: chartColors.gradients.secondary,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }, {
                label: 'High Value Customers',
                data: dashboardData.roas.highValueCustomers,
                borderColor: chartColors.tertiary,
                backgroundColor: chartColors.gradients.tertiary,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + 'x ROAS';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'ROAS (Return on Ad Spend)'
                    }
                }
            }
        }
    });
}

function initializeCohortChart() {
    const ctx = document.getElementById('cohortChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dashboardData.cohort.labels,
            datasets: [{
                label: 'New Customers',
                data: dashboardData.cohort.newCustomers,
                backgroundColor: chartColors.primary,
                borderColor: chartColors.primary,
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Returning Customers',
                data: dashboardData.cohort.returningCustomers,
                backgroundColor: chartColors.secondary,
                borderColor: chartColors.secondary,
                borderWidth: 1,
                yAxisID: 'y'
            }, {
                label: 'Retention Rate %',
                data: dashboardData.cohort.retentionRates,
                backgroundColor: chartColors.tertiary,
                borderColor: chartColors.tertiary,
                borderWidth: 2,
                type: 'line',
                yAxisID: 'y1',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    },
                    beginAtZero: true
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Retention Rate %'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    beginAtZero: false
                }
            }
        }
    });
}

// Animation functions for audience bars
function animateAudienceBars() {
    const bars = document.querySelectorAll('.conversion-bar-fill');
    
    bars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.width || '0%';
        }, index * 200);
    });
}

// Utility functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function updateMetricCards() {
    // This function can be used to update metric cards with real-time data
    const cards = document.querySelectorAll('.stat-card-value');
    
    // Example of how to update values (you would get these from your API)
    const metrics = {
        conversions: 1400,
        conversionRate: 4.2,
        avgRoas: 8.2,
        customerLtv: 485,
        activeCustomers: 12450
    };
    
    // Update each card if needed
    // This is just an example - you'd implement based on your data source
}

// Resize handler for responsive charts
function handleResize() {
    // Chart.js automatically handles resize, but you can add custom logic here
    console.log('Dashboard resized');
}

// Initialize dashboard
function initializeDashboard() {
    // Initialize all charts
    initializeJourneyChart();
    initializeChannelChart();
    initializeCampaignChart();
    initializeRoasChart();
    initializeCohortChart();
    
    // Animate audience bars
    setTimeout(animateAudienceBars, 500);
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    console.log('Dashboard initialized successfully');
}

// Wait for DOM to be loaded, then initialize
document.addEventListener('DOMContentLoaded', function() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Please include Chart.js before this script.');
        return;
    }
    
    initializeDashboard();
});

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeDashboard,
        updateMetricCards,
        formatNumber,
        chartColors,
        dashboardData
    };
}