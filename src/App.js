import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function App() {
  // States for inputs
  const [months, setMonths] = useState(12);
  const [startingUsers, setStartingUsers] = useState(100);
  const [growthRate, setGrowthRate] = useState(10);
  const [churnRate, setChurnRate] = useState(2);
  const [revenuePerUser, setRevenuePerUser] = useState(10);
  const [costPerUser, setCostPerUser] = useState(3);
  const [fixedOverhead, setFixedOverhead] = useState(1000);
  const [revenueBoost, setRevenueBoost] = useState(false);
  const [growthDrop, setGrowthDrop] = useState(false);

  const [forecastData, setForecastData] = useState([]);

  // Calculate forecast on button click
  const generateForecast = () => {
    let users = startingUsers;
    let data = [];

    for (let month = 1; month <= months; month++) {
      // Adjust growth rate after month 12
      let effectiveGrowthRate = growthRate;
      if (growthDrop && month > 12) {
        effectiveGrowthRate = growthRate * 0.5;
      }

      // Adjust revenue per user after month 6
      let effectiveRevenuePerUser = revenuePerUser;
      if (revenueBoost && month > 6) {
        effectiveRevenuePerUser = revenuePerUser * 1.1;
      }

      // Calculate new users & churn
      const newUsers = users * (effectiveGrowthRate / 100);
      const churnedUsers = users * (churnRate / 100);

      users = users + newUsers - churnedUsers;
      if (users < 0) users = 0;

      const revenue = users * effectiveRevenuePerUser;
      const costs = users * costPerUser + fixedOverhead;
      const profit = revenue - costs;

      data.push({
        month,
        users: Math.round(users),
        revenue: parseFloat(revenue.toFixed(2)),
        costs: parseFloat(costs.toFixed(2)),
        profit: parseFloat(profit.toFixed(2)),
      });
    }

    setForecastData(data);
  };

  // Export as CSV
  const exportCSV = () => {
    if (forecastData.length === 0) return alert("Generate forecast first!");

    const header = ["Month", "Users", "Revenue (£)", "Costs (£)", "Profit (£)"];
    const rows = forecastData.map(
      ({ month, users, revenue, costs, profit }) => [
        month,
        users,
        revenue,
        costs,
        profit,
      ]
    );

    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "revenue_forecast.csv";
    link.click();
  };

  // Export as JSON
  const exportJSON = () => {
    if (forecastData.length === 0) return alert("Generate forecast first!");

    const jsonContent = JSON.stringify(forecastData, null, 2);

    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "revenue_forecast.json";
    link.click();
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1>Revenue Forecaster Lite</h1>

      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "grid", gap: 10, marginBottom: 20 }}
      >
        <label>
          Number of months (12-36):
          <input
            type="number"
            min={12}
            max={36}
            value={months}
            onChange={(e) => {
              let val = Number(e.target.value);
              if (val < 12) val = 12;
              else if (val > 36) val = 36;
              setMonths(val);
            }}
          />
        </label>

        <label>
          Starting users:
          <input
            type="number"
            min={0}
            value={startingUsers}
            onChange={(e) =>
              setStartingUsers(Math.max(0, Number(e.target.value)))
            }
          />
        </label>

        <label>
          Monthly growth rate (%):
          <input
            type="number"
            min={0}
            step={0.1}
            value={growthRate}
            onChange={(e) => setGrowthRate(Math.max(0, Number(e.target.value)))}
          />
        </label>

        <label>
          Monthly churn rate (%):
          <input
            type="number"
            min={0}
            step={0.1}
            value={churnRate}
            onChange={(e) => setChurnRate(Math.max(0, Number(e.target.value)))}
          />
        </label>

        <label>
          Revenue per user (£):
          <input
            type="number"
            min={0}
            step={0.01}
            value={revenuePerUser}
            onChange={(e) =>
              setRevenuePerUser(Math.max(0, Number(e.target.value)))
            }
          />
        </label>

        <label>
          Cost per user (£):
          <input
            type="number"
            min={0}
            step={0.01}
            value={costPerUser}
            onChange={(e) =>
              setCostPerUser(Math.max(0, Number(e.target.value)))
            }
          />
        </label>

        <label>
          Fixed monthly overhead (£):
          <input
            type="number"
            min={0}
            step={0.01}
            value={fixedOverhead}
            onChange={(e) =>
              setFixedOverhead(Math.max(0, Number(e.target.value)))
            }
          />
        </label>

        <label>
          <input
            type="checkbox"
            checked={revenueBoost}
            onChange={(e) => setRevenueBoost(e.target.checked)}
          />
          10% revenue increase after month 6
        </label>

        <label>
          <input
            type="checkbox"
            checked={growthDrop}
            onChange={(e) => setGrowthDrop(e.target.checked)}
          />
          50% growth drop after month 12
        </label>

        <button
          type="button"
          onClick={generateForecast}
          style={{ marginTop: 10 }}
        >
          Generate Forecast
        </button>
      </form>

      {forecastData.length > 0 && (
        <>
          <h2>Forecast Table</h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ddd",
                textAlign: "right",
              }}
            >
              <thead style={{ backgroundColor: "#f9f9f9" }}>
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      textAlign: "center",
                    }}
                  >
                    Month
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    Users
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    Revenue (£)
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    Costs (£)
                  </th>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: 8,
                      textAlign: "right",
                    }}
                  >
                    Profit (£)
                  </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.map(
                  ({ month, users, revenue, costs, profit }) => (
                    <tr key={month}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: 8,
                          textAlign: "center",
                        }}
                      >
                        {month}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: 8 }}>
                        {users}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: 8 }}>
                        {revenue.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: 8 }}>
                        {costs.toFixed(2)}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: 8 }}>
                        {profit.toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <h2>Forecast Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={forecastData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                label={{
                  value: "Month",
                  position: "insideBottomRight",
                  offset: 0,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#8884d8"
                name="Users"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                name="Revenue (£)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#ff7300"
                name="Profit (£)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div style={{ marginTop: 20 }}>
            <button onClick={exportCSV} style={{ marginRight: 10 }}>
              Export CSV
            </button>
            <button onClick={exportJSON}>Export JSON</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
