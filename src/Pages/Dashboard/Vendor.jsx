import React from "react";
import { Avatar, Card, Table, Space, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";

const Vendor = () => {
  const barber = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "+123456789",
    address: "123 Main St, Cityville",
    experienceLevel: "Senior",
    rating: 4.8,
    subject: "Math",
    totalServices: 120,
    totalEarnings: "$6000",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    courses: [
      {
        id: "r1",
        courseName: "Course 1",
        grade: "10th",
        level: "Advanced",
        publishDate: "2023-12-12",
        status: "Active",
        totalViews: 100,
      },
      {
        id: "r2",
        courseName: "Course 2",
        grade: "6th",
        level: "Advanced",
        publishDate: "2023-12-12",
        status: "Pending",
        totalViews: 130,
      },
      {
        id: "r3",
        courseName: "Course 3",
        grade: "8th",
        level: "Advanced",
        publishDate: "2023-12-12",
        status: "Pending",
        totalViews: 170,
      },
    ],
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Publish Date",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "Total Views",
      dataIndex: "totalViews",
      key: "totalViews",
    },
  ];

  const handleReviewAction = (reviewId, action) => {
    console.log(`${action} review with ID: ${reviewId}`);
    // Implement the logic for approving, rejecting, or deleting the review
  };

  return (
    <div className=" mx-auto p-4">
      <div className="mb-4">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className=" border-4 p-1 rounded-full">
              <img
                src={barber.profileImg || randomImg}
                alt={barber.name}
                size={100}
                className="border-2 w-[200px] h-[200px] rounded-full  border-gray-300"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {barber.name}
              </h2>
            </div>
          </div>
          <div className="ml-4 text-xl flex flex-col gap-1">
            <p className="text-gray-600">
              <span className="font-semibold">Email: </span>
              {barber.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Subject: </span>
              {barber.subject}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Courses</span>{" "}
              {barber.totalServices}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Earnings:</span>{" "}
              {barber.totalEarnings}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold"> Status:</span>{" "}
              <span
                className={`px-2 py-1  ${
                  barber.status === "Active"
                    ? "text-green-500"
                    : barber.status === "Inactive"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {barber.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <Card title="Courses" className="shadow-lg mt-20">
        <Table
          columns={columns}
          dataSource={barber.courses}
          rowKey={(record) => record.id}
        />
      </Card>
    </div>
  );
};

export default Vendor;
