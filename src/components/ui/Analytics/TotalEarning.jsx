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

const TotalEarning = ({ totalEarning }) => {
  // console.log(totalEarning);

  const chartData = totalEarning;

  return (
    <div className="bg-white border p-5 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Total Earning</p>
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
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#023F86"
            fill="#D7E8FD"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalEarning;
