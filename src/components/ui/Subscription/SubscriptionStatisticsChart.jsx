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

const data = [
  {
    name: "January",
    monthlySubscription: 4000,
    yearlySubscription: 2400,
  },
  {
    name: "February",
    monthlySubscription: 3000,
    yearlySubscription: 1398,
  },
  {
    name: "March",
    monthlySubscription: 2000,
    yearlySubscription: 9800,
  },
  {
    name: "April",
    monthlySubscription: 2780,
    yearlySubscription: 3908,
  },
  {
    name: "May",
    monthlySubscription: 1890,
    yearlySubscription: 4800,
  },
  {
    name: "June",
    monthlySubscription: 2390,
    yearlySubscription: 3800,
  },
  {
    name: "July",
    monthlySubscription: 3490,
    yearlySubscription: 4300,
  },
  {
    name: "August",
    monthlySubscription: 3000,
    yearlySubscription: 2400,
  },
  {
    name: "September",
    monthlySubscription: 2000,
    yearlySubscription: 9800,
  },
  {
    name: "October",
    monthlySubscription: 2780,
    yearlySubscription: 3908,
  },
  {
    name: "November",
    monthlySubscription: 1890,
    yearlySubscription: 4800,
  },
  {
    name: "December",
    monthlySubscription: 2390,
    yearlySubscription: 3800,
  },
];

const SubscriptionStatisticsChart = ({ oneYearData }) => {
  // console.log(oneYearData);

  const slicedMonthName = oneYearData?.map((item) => item.month.slice(0, 3));

  const modifiedData = oneYearData?.map((item, index) => ({
    month: slicedMonthName[index],
    monthly: item.monthly,
    yearly: item.yearly,
  }));

  return (
    <div className="h-[500px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={500}
          height={200}
          data={modifiedData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" orientation="left" stroke="#023F86" />
          <YAxis yAxisId="right" orientation="right" stroke="#008DE7" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="monthly" fill="#023F86" barSize={20} />
          <Bar yAxisId="right" dataKey="yearly" fill="#008DE7" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionStatisticsChart;
