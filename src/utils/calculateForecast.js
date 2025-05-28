// src/utils/calculateForecast.js

export function calculateForecast({
  months,
  startingUsers,
  growthRate,
  churnRate,
  revenuePerUser,
  costPerUser,
  fixedOverhead,
  enableRevenueBoost,
  enableGrowthDrop,
}) {
  const data = [];
  let activeUsers = startingUsers;
  let currentGrowthRate = growthRate;

  for (let month = 1; month <= months; month++) {
    // Adjust growth rate if enabled and month > 12
    if (enableGrowthDrop && month > 12) {
      currentGrowthRate = growthRate / 2;
    }

    // Calculate new users gained this month
    const newUsers = activeUsers * (currentGrowthRate / 100);
    // Calculate churned users this month
    const churnedUsers = activeUsers * (churnRate / 100);

    // Update active users count
    activeUsers = activeUsers + newUsers - churnedUsers;

    // Calculate revenue boost if enabled and month > 6
    let effectiveRevenuePerUser = revenuePerUser;
    if (enableRevenueBoost && month > 6) {
      effectiveRevenuePerUser = revenuePerUser * 1.1;
    }

    // Calculate revenue, cost, profit
    const revenue = activeUsers * effectiveRevenuePerUser;
    const cost = activeUsers * costPerUser + fixedOverhead;
    const profit = revenue - cost;

    data.push({
      month,
      activeUsers,
      revenue,
      cost,
      profit,
    });
  }

  return data;
}
