const API_URL = "https://harman.ssi.iviva.cloud/Lucy/Bosch_new_static/getAverageVehicleCount";
const API_KEY = "SC:hdemo:b7100e5a54712a0e";
const USE_SAMPLE_DATA = false; // fallback mode

async function fetchData() {
    if (USE_SAMPLE_DATA) {
        const res = await fetch("sample_data.json");
        return res.json();
    }
    try {
        const res = await fetch(API_URL, {
            headers: { Authorization: `APIKEY ${API_KEY}` }
        });
        if (!res.ok) throw new Error("API request failed");
        return res.json();
    } catch (error) {
        console.error("API failed, loading sample data...", error);
        const res = await fetch("sample_data.json");
        return res.json();
    }
}

function analyzeData(data) {
    const hours = [];
    const upwardCounts = [];
    const downwardCounts = [];
    const totalCounts = [];

    data.forEach(item => {
        hours.push(item.hour);
        upwardCounts.push(item.upward);
        downwardCounts.push(item.downward);
        totalCounts.push(item.upward + item.downward);
    });

    // KPIs
    const totalVehicles = totalCounts.reduce((a, b) => a + b, 0);
    document.getElementById("totalVehicles").textContent = totalVehicles.toLocaleString();

    const peakHourData = data.reduce((max, h) => (h.upward + h.downward > max.total ? { hour: h.hour, total: h.upward + h.downward } : max), { total: 0 });
    document.getElementById("peakHour").textContent = `${peakHourData.hour} (${peakHourData.total} vehicles)`;

    const mean = totalVehicles / totalCounts.length;
    const stdDev = Math.sqrt(totalCounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / totalCounts.length);
    const anomalies = data.filter(h => Math.abs((h.upward + h.downward) - mean) > 1.5 * stdDev);
    document.getElementById("anomalyCount").textContent = anomalies.length;

    // Charts
    renderCharts(hours, upwardCounts, downwardCounts, totalCounts, anomalies);
}

function renderCharts(hours, upwardCounts, downwardCounts, totalCounts, anomalies) {
    // Line chart (Total Vehicles)
    const ctxLine = document.getElementById("trafficChart").getContext("2d");
    new Chart(ctxLine, {
        type: "line",
        data: {
            labels: hours,
            datasets: [
                { label: "Total Vehicles", data: totalCounts, borderColor: "blue", fill: false }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                annotation: {
                    annotations: anomalies.map(a => ({
                        type: 'line',
                        scaleID: 'x',
                        value: a.hour,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: 'Anomaly',
                            enabled: true,
                            position: 'top'
                        }
                    }))
                }
            }
        }
    });

    // Stacked bar chart (Upward vs Downward)
    const ctxBar = document.getElementById("directionChart").getContext("2d");
    new Chart(ctxBar, {
        type: "bar",
        data: {
            labels: hours,
            datasets: [
                { label: "Upward", data: upwardCounts, backgroundColor: "rgba(54, 162, 235, 0.7)" },
                { label: "Downward", data: downwardCounts, backgroundColor: "rgba(255, 99, 132, 0.7)" }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            }
        }
    });
}

fetchData().then(analyzeData);
