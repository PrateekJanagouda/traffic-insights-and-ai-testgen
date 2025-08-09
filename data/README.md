# Task 1 – Vehicle Traffic Dashboard

## 📖 Project Story
This dashboard visualizes hourly vehicle traffic data fetched from a live API.  
The goal is to present meaningful insights through a clear narrative, interactive charts, and a simple but professional UI.

The API returns hourly counts of vehicles moving **upward** and **downward**. From this, the dashboard identifies:
- **Total vehicle count** over the observed period.
- **Peak traffic hours** (top 3 busiest hours).
- **Anomalies** — hours with unusually high or low traffic compared to the average.
- **Trends** — visualized with a line chart.
- **Distribution** — visualized with a bar chart.

---

## 📊 Key Insights Highlighted
1. **Total Vehicles** – Shows the total traffic volume over the dataset.
2. **Peak Hours** – The top 3 busiest hours by vehicle count.
3. **Anomalies** – Hours where traffic is significantly above or below the average (statistical outliers).
4. **Narrative Summary** – Auto-generated text telling the story behind the data.

---

## 🎨 UI/UX Design Choices
- **Card Layout**: Displays key metrics in a quick-to-read format.
- **Two Charts**:
  - **Line Chart** – Shows upward vs. downward traffic trends over time.
  - **Bar Chart** – Displays total vehicle counts per hour.
- **Responsive Layout**: Works on desktops and adjusts for smaller screens.
- **Clean Colors**: Blue for upward traffic, red for downward traffic, green for total counts.
- **Auto-Generated Insights**: Written summary so users can understand the story at a glance.

---

## ⚙️ Technical Implementation
- **HTML + CSS + JavaScript** — No build tools or Node.js required.
- **Chart.js** — For interactive and responsive chart rendering.
- **Fetch API** — Retrieves JSON data from the provided endpoint.
- **Data Analysis in JS**:
  - Sorting and structuring data by hour.
  - Calculating totals, peaks, and anomalies.
  - Using mean and standard deviation to detect anomalies.

---

## 🚀 How to Run
1. **Download the project** (or just the `index.html` file).
2. **Open `index.html`** in any modern browser (Chrome, Edge, Firefox, Safari).
3. The dashboard will automatically:
   - Fetch the live data.
   - Display key metrics.
   - Render two charts.
   - Show a narrative insight.

---

## 📁 File Structure
