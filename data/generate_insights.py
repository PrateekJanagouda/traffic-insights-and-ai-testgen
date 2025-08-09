import json
import numpy as np

# Load traffic data
with open("sample_data.json", "r") as f:
    data = json.load(f)

# Extract values
hours = [entry["hour"] for entry in data]
upward = np.array([entry["upward"] for entry in data])
downward = np.array([entry["downward"] for entry in data])
total = upward + downward

# Compute totals
total_upward = int(upward.sum())
total_downward = int(downward.sum())

# Identify busier direction
busier_direction = "Upward" if total_upward > total_downward else "Downward"

# Find peak & low hours
peak_idx = int(np.argmax(total))
low_idx = int(np.argmin(total))
peak_hour = hours[peak_idx]
low_hour = hours[low_idx]
peak_total = int(total[peak_idx])
low_total = int(total[low_idx])

# Detect anomalies: hours with z-score > 2
z_scores = (total - total.mean()) / total.std()
anomalies = [hours[i] for i, z in enumerate(z_scores) if abs(z) > 2]

# Save insights
insights = {
    "busier_direction": busier_direction,
    "total_upward": total_upward,
    "total_downward": total_downward,
    "peak_hour": peak_hour,
    "peak_total": peak_total,
    "low_hour": low_hour,
    "low_total": low_total,
    "anomalies": anomalies
}

with open("insights.json", "w") as f:
    json.dump(insights, f, indent=4)

print("Insights generated and saved to insights.json ✅")
