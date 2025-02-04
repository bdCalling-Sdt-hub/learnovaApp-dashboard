import { FaUsers } from "react-icons/fa6";
import logo from "../../../assets/logo.png";
import { useGeneralStatsQuery } from "../../../redux/apiSlices/dashboardSlice";

const GeneralStateSection = () => {
  const { data: generalState, isLoading } = useGeneralStatsQuery();

  // Simulated dummy data
  // const generalState = {
  //   data: {
  //     totalActiveUsers: 1500,
  //     newSignups: 120,
  //     totalActiveVendors: 45,
  //     totalCompletedOrders: 320,
  //     totalServices: 75,
  //     totalCourses: 30,
  //   },
  // };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const state = generalState?.data;

  // console.log(state);

  return (
    <div className="grid md:grid-cols-5 gap-6 md:h-[80px]">
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-sm ">Total Users</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalUsers}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-sm ">New Sign Ups</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.newSignsUp}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-sm ">Total Quiz</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalQuiz}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-sm ">Total Shorts</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalShorts}
          </h3>
        </div>
      </div>
      <div className="bg-white rounded-2xl py-0 px-6 flex items-center justify-start gap-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <FaUsers color="#210630" size={24} />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-center text-sm ">Total Courses</h2>
          <h3 className="text-center text-2xl font-semibold">
            {state?.totalCourses}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
