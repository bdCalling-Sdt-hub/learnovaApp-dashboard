import React from "react";
import { Table } from "antd";

const TopCoursesTable = ({ topCourses }) => {
  // console.log(topCourses);

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
      key: "slNo",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Course Name",
      dataIndex: "title",
      key: "title",
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
      dataIndex: ["teacher", "name"],
      key: "teacher",
    },
    {
      title: "Views",
      dataIndex: "totalViews",
      key: "totalViews",
    },
  ];

  return (
    <div className="border bg-white h-[370px] p-5 rounded-2xl">
      <h1 className="font-bold text-lg mb-2">Top Courses</h1>
      <Table
        columns={columns}
        rowKey="_id"
        dataSource={topCourses?.slice(0, 4)}
        pagination={false}
      />
    </div>
  );
};

export default TopCoursesTable;
