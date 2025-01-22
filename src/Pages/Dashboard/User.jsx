import React from "react";
import { ConfigProvider, Input, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";

const User = () => {
  const { id } = useParams();

  // Sample user data
  const user = {
    name: "John Doe",
    id: "#5568164",
    email: "johndoe@example.com",
    address: {
      street: "123 Main St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    phone: "+1 (555) 123-4567",
    imgUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    grade: "10th",
    school: "ABC High School",
  };

  const enrolledCourses = [
    {
      course: "Mathematics",
      status: "Completed",
    },
    {
      course: "Physics",
      status: "Ongoing",
    },
    {
      course: "Chemistry",
      status: "Upcoming",
    },
  ];

  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div>
      <div>
        <div className="flex items-center gap-10">
          <div className="flex gap-3 items-center ">
            <img
              className="rounded-full w-16 h-16"
              src={
                imgUrl?.startsWith("http")
                  ? imgUrl
                  : `${import.meta.env.VITE_BASE_URL}${imgUrl}`
              }
              alt="img"
            />
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-sm text-gray-400">User ID: {user.id} </p>
            </div>
          </div>
          <div>
            <h1 className="text-lg border px-2 py-1 hover:shadow-lg rounded-xl border-primary text-primary">
              Subscribed to Student Yearly Package
            </h1>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[70%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">{user?.name}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{user?.email}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Phone
            </h1>
            <p className="text-lg my-2">{user?.phone}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Current Grade
            </h1>
            <p className="text-lg my-2">{user?.grade}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Current School
            </h1>
            <p className="text-lg my-2">{user?.school}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Address
            </h1>
            <p className="text-lg my-2">
              {user?.address ? (
                <>
                  {user?.address?.street}, {user?.address?.state},{" "}
                  {user?.address?.city}, {user?.address?.country}
                </>
              ) : (
                "N/A"
              )}
            </p>
          </div>
        </div>
      </div>
      <div>
        {/* <RunningOrderTable
          filterProps={
            user?.vendor?.name || user?.admin?.name || user?.customer?.name
          }
        /> */}
        <h1 className="font-bold text-xl my-5">Enrolled Courses</h1>

        <div className="grid grid-cols-3 gap-5">
          {enrolledCourses?.map((course) => (
            <div className="bg-white rounded-2xl p-4 flex gap-3 items-center justify-around">
              <div>
                <h1 className="font-semibold text-sm border-b-2 border-dashed">
                  Course
                </h1>
                <p className="text-lg my-2">{course?.course}</p>
              </div>
              <div>
                <h1 className="font-semibold text-sm border-b-2 border-dashed">
                  Status
                </h1>
                <p className="text-lg my-2">{course?.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
