import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const TotalEarning = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Dummy data to simulate earnings data
  const dummyChartData = [
    { month: "Saturday", revenue: 1200 },
    { month: "Sunday", revenue: 1500 },
    { month: "Monday", revenue: 1800 },
    { month: "Tuesday", revenue: 2100 },
    { month: "Wednesday", revenue: 2500 },
    { month: "Thursday", revenue: 2300 },
    { month: "Friday", revenue: 2700 },
  ];

  const chartData = dummyChartData;

  // Generate years from 10 years back to 1 year ahead
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => currentYear - 10 + i
  ).reverse();

  return (
    <div className="bg-white border p-5 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Total Earning</p>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          className="border rounded-md px-3 py-1 cursor-pointer"
          style={{
            maxHeight: "150px",
            overflowY: "scroll",
          }}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#023F86"
            fill="#D7E8FD"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalEarning;
