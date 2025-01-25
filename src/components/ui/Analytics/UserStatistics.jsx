import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logo from "../../../assets/logo.png";

const dummyChartData = [
  { month: "Saturday", userCount: 120 },
  { month: "Sunday", userCount: 150 },
  { month: "Monday", userCount: 200 },
  { month: "Tuesday", userCount: 180 },
  { month: "Wednesday", userCount: 220 },
  { month: "Thursday", userCount: 250 },
  { month: "Friday", userCount: 300 },
];

const UserStatistics = ({ totalEnrollments }) => {
  // console.log(totalEnrollments);
  return (
    <div className="bg-white border p-4 rounded-2xl" style={{ width: "100%" }}>
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold">Enrollment Statistics</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          width={500}
          height={200}
          data={totalEnrollments}
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

export default UserStatistics;
