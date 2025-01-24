import React from "react";
import { Table } from "antd";

const TopCoursesTable = () => {
  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
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
      title: "Teacher Name",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
  ];

  const data = [
    {
      key: 1,
      slNo: 1,
      name: "Course A",
      grade: "A",
      level: "Beginner",
      teacher: "John Doe",
      views: 150,
    },
    {
      key: 2,
      slNo: 2,
      name: "Course B",
      grade: "B",
      level: "Intermediate",
      teacher: "Jane Smith",
      views: 200,
    },
    {
      key: 2,
      slNo: 2,
      name: "Course B",
      grade: "B",
      level: "Intermediate",
      teacher: "Jane Smith",
      views: 200,
    },
    {
      key: 2,
      slNo: 2,
      name: "Course B",
      grade: "B",
      level: "Intermediate",
      teacher: "Jane Smith",
      views: 200,
    },
    // Add more courses as needed
  ];

  return (
    <div className="border bg-white h-[370px] p-5 rounded-2xl">
      <h1 className="font-bold text-lg my-2">Top Courses</h1>
      <Table columns={columns} dataSource={data?.slice(0, 3)} />
    </div>
  );
};

export default TopCoursesTable;
