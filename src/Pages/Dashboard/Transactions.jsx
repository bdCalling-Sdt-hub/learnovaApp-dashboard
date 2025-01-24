import BestShortsChart from "../../components/ui/Analytics/BestShortsChart";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import TopCoursesTable from "../../components/ui/Analytics/TopCoursesTable";
import TopShortsTable from "../../components/ui/Analytics/TopShortsTable";
import TotalEarning from "../../components/ui/Analytics/TotalEarning";
import UserStatistics from "../../components/ui/Analytics/UserStatistics";

const Analytics = () => {
  return (
    <div>
      <div className="flex w-full gap-6">
        <div className="w-[45%]">
          <TotalEarning />
        </div>
        <div className="w-[55%]">
          <TopCoursesTable />
        </div>
      </div>
      <div className="flex w-full gap-6 mt-5">
        <div className="w-[55%]">
          <UserStatistics />
        </div>
        <div className="w-[45%]">
          <TopShortsTable />
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
