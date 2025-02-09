import { Tooltip } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useOperationalMetricsQuery } from "../../../redux/apiSlices/dashboardSlice";
import logo from "../../../assets/logo.png";

const dummyChartData = [
  { month: "Saturday", Shorts: 120, Courses: 200 },
  { month: "Sunday", Shorts: 150, Courses: 220 },
  { month: "Monday", Shorts: 200, Courses: 250 },
  { month: "Tuesday", Shorts: 160, Courses: 170 },
  { month: "Wednesday", Shorts: 230, Courses: 320 },
  { month: "Thursday", Shorts: 190, Courses: 280 },
  { month: "Friday", Shorts: 250, Courses: 340 },
];

const dayMap = {
  1: "Sat",
  2: "Sun",
  3: "Mon",
  4: "Tue",
  5: "Wed",
  6: "Thu",
  7: "Fri",
};

const RunningOrdersTable = () => {
  const { data: operationalMetrics, isFetching } = useOperationalMetricsQuery();

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const chartData = operationalMetrics?.data;

  const { metrics } = chartData;

  console.log(chartData);

  return (
    <div className="border bg-white h-[360px] p-5 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl mb-1">Operational Metrics</h1>
      </div>
      <div className="flex items-center gap-5">
        <div className="grid grid-cols-2 w-[40%] my-5 gap-5">
          <div className="flex flex-col justify-center p-5 bg-blue-50 rounded-2xl">
            <h1>Uploaded No. of Shorts this week</h1>
            <div className="flex items-center text-2xl gap-1">
              {" "}
              <p className="bg-[#023F86] w-5 h-5 rounded-full"></p>{" "}
              {chartData?.weeklyShorts}
            </div>
          </div>
          <div className="flex flex-col  p-5 bg-blue-50 rounded-2xl">
            <h1>Uploaded No. of Courses this week</h1>
            <div className="flex items-center text-2xl gap-1">
              {" "}
              <p className="bg-[#5c2579cc] w-5 h-5 rounded-full"></p>{" "}
              {chartData?.weeklyCourses}
            </div>
          </div>
          <div className="flex flex-col  p-5 bg-blue-50 rounded-2xl">
            <h1>Total No. of Shorts</h1>
            <div className="flex items-center text-2xl gap-1">
              {" "}
              <p className="bg-[#023F86] w-5 h-5 rounded-full"></p>{" "}
              {chartData?.totalShorts}
            </div>
          </div>
          <div className="flex flex-col  p-5 bg-blue-50 rounded-2xl">
            <h1>Total No. of Courses</h1>
            <div className="flex items-center text-2xl gap-1">
              {" "}
              <p className="bg-[#5c2579cc] w-5 h-5 rounded-full"></p>{" "}
              {chartData?.totalCourses}
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={metrics}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                tickFormatter={(day) => dayMap[day] || day}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="bottom" align="center" />
              <Line
                type="monotone"
                dataKey="totalShort"
                stroke="#023F86"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="totalCourses" stroke="#5c2579cc" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RunningOrdersTable;
