HEAD

# Revenue Forecaster Lite

A simple local web application that forecasts the financial performance of a SaaS startup over time. Built using **React.js**, this tool helps simulate user growth, revenue, and costs to estimate profit or loss over a period of 12 to 36 months.

🚀 How to Run the App

1. Ensure **Node.js** and **npm** are installed.
2. Clone the repository or unzip the provided folder.
3. Open a terminal in the project folder.
4. Run the following command:

npm install && npm start

The app will open in your default browser at `http://localhost:3000`.

🔧 Tech Stack

- **Frontend:** React.js (functional components + hooks)
- **Charting:** Chart.js via react-chartjs-2
- **State Management:** useState & useEffect hooks
- **Styling:** Inline CSS (optionally extensible)
- **Data Export:** CSV and JSON via Blob API
- **Testing:** Simple unit test with Jest

## 📊 Features

- Interactive forecast inputs:
  - Number of months (12-36)
  - Starting users
  - Growth and churn rates
  - Revenue and cost per user
  - Fixed overheads
- Forecast output:
  - Table of monthly data (users, revenue, cost, profit)
  - Line chart visualization
  - Totals at the end of forecast
- Toggle features:
  - +10% revenue/user after month 6
  - -50% growth rate after month 12
- Export forecast data to CSV or JSON

## 🧪 Testing

Includes basic unit test for calculation logic:

npm test

## 📁 File Structure

- `src/`
  - `App.js` – main component
  - `components/` – reusable input, table, chart, export components
  - `utils/` – calculation functions
  - `tests/` – unit tests
- `public/` – static HTML
- `README.txt` – this file
- `CALCULATIONS.md` – formulas and assumptions

## 📄 License

MIT – free to use and modify.

For any questions or clarifications, feel free to reach out.

– Developed by Venkata L N R Nanduri
