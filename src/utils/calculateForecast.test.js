import { calculateForecast } from "./calculateForecast";

test("calculateForecast returns correct data for 1 month without boosts", () => {
  const input = {
    months: 1,
    startingUsers: 100,
    growthRate: 10,
    churnRate: 5,
    revenuePerUser: 10,
    costPerUser: 3,
    fixedOverhead: 1000,
    enableRevenueBoost: false,
    enableGrowthDrop: false,
  };

  const result = calculateForecast(input);

  // Expected active users calculation:
  // newUsers = 100 * 10% = 10
  // churnedUsers = 100 * 5% = 5
  // activeUsers = 100 + 10 - 5 = 105

  // revenue = 105 * 10 = 1050
  // cost = 105 * 3 + 1000 = 315 + 1000 = 1315
  // profit = 1050 - 1315 = -265

  expect(result.length).toBe(1);
  expect(result[0].month).toBe(1);
  expect(Math.round(result[0].activeUsers)).toBe(105);
  expect(Math.round(result[0].revenue)).toBe(1050);
  expect(Math.round(result[0].cost)).toBe(1315);
  expect(Math.round(result[0].profit)).toBe(-265);
});
