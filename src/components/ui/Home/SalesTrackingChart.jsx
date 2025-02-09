import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSalesAndRevenueChartQuery } from "../../../redux/apiSlices/dashboardSlice";
import logo from "../../../assets/logo.png";

const SalesTrackingChart = () => {
  const { data: salesAndRevenueChart, isFetching } =
    useSalesAndRevenueChartQuery();

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const dayMapping = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = salesAndRevenueChart?.data?.map((item) => ({
    ...item,
    day: dayMapping[item.day - 1],
  }));

  console.log(chartData);

  return (
    <ResponsiveContainer width="90%" height={230}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="30%"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Thinner bars */}
        <Bar
          dataKey="Sales"
          stackId="a"
          fill="#023F86"
          // radius={[20, 20, 0, 0]}
          barSize={50}
        />
        <Bar
          dataKey="total"
          stackId="a"
          fill="#D7E8FD"
          radius={[5, 5, 0, 0]}
          barSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesTrackingChart;
