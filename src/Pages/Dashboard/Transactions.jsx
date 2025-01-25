import BestShortsChart from "../../components/ui/Analytics/BestShortsChart";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import TopCoursesTable from "../../components/ui/Analytics/TopCoursesTable";
import TopShortsTable from "../../components/ui/Analytics/TopShortsTable";
import TotalEarning from "../../components/ui/Analytics/TotalEarning";
import UserStatistics from "../../components/ui/Analytics/UserStatistics";
import {
  useChartDataQuery,
  useTopCourseAndShortsQuery,
} from "../../redux/apiSlices/analyticsSlice";
import logo from "../../assets/logo.png";

const Analytics = () => {
  const { data: chartData, isLoading } = useChartDataQuery();
  const { data: topCourseAndShorts, isLoading: topCourseAndShortsLoading } =
    useTopCourseAndShortsQuery();

  if (isLoading || topCourseAndShortsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const getChartData = chartData?.data;
  const { totalEarning } = getChartData;
  const { totalEnrollments } = getChartData;

  const getTopCourseAndShorts = topCourseAndShorts?.data;
  const { topCourses, topShorts } = getTopCourseAndShorts;

  // console.log(getTopCourseAndShorts);

  return (
    <div>
      <div className="flex w-full gap-6">
        <div className="w-[45%]">
          <TotalEarning totalEarning={totalEarning} />
        </div>
        <div className="w-[55%]">
          <TopCoursesTable topCourses={topCourses} />
        </div>
      </div>
      <div className="flex w-full gap-6 mt-5">
        <div className="w-[55%]">
          <UserStatistics totalEnrollments={totalEnrollments} />
        </div>
        <div className="w-[45%]">
          <TopShortsTable topShorts={topShorts} />
        </div>
      </div>
      {/* <div className="mt-5">
        {" "}
        <RunningOrderTable />
      </div> */}
    </div>
  );
};

export default Analytics;
