// app.js - key functions (simplified)
async function fetchAPI(endpoint, apiKey){
  const res = await fetch(endpoint, { headers: { 'Authorization': apiKey }});
  if (!res.ok) throw new Error('API error ' + res.status);
  return res.json();
}

async function loadData(){
  const endpoint = document.getElementById('apiEndpoint').value;
  const apiKey = document.getElementById('apiKey').value;
  const status = document.getElementById('status');
  status.textContent = 'Fetching...';
  try {
    const data = await fetchAPI(endpoint, apiKey);
    status.textContent = 'Loaded from API';
    processAndRender(data);
  } catch(e){
    console.warn(e);
    status.textContent = 'API failed; using sample_data.json';
    const data = await fetch('sample_data.json').then(r=>r.json());
    processAndRender(data);
  }
}

function processAndRender(data){
  const parsed = data.map(d => ({
    hour: d.hour,
    upward: Number(d.upward)||0,
    downward: Number(d.downward)||0,
    vehicleType: d.vehicleType||'all'
  })).sort((a,b)=> a.hour.localeCompare(b.hour));

  // compute derived arrays
  const labels = parsed.map(p=>p.hour);
  const upward = parsed.map(p=>p.upward);
  const downward = parsed.map(p=>p.downward);
  const totals = parsed.map(p=>p.upward + p.downward);
  const net = upward.map((u,i) => u - downward[i]);

  renderStackedChart(labels, upward, downward);
  renderNetChart(labels, net);
  computeAndShowInsights(parsed, totals, net);
}

/* ... chart render functions using Chart.js - use stacked bar and line ... */

document.getElementById('loadBtn').addEventListener('click', loadData);
// auto-load sample on start for quick preview
fetch('sample_data.json').then(r=>r.json()).then(processAndRender);
