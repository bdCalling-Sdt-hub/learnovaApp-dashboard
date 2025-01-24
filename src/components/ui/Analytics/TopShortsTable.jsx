import React from "react";
import { Table } from "antd";

const TopShortsTable = () => {
  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
      key: "slNo",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
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
      subject: "Math",
      level: "Beginner",
      teacher: "Alice Johnson",
      views: 120,
    },
    {
      key: 2,
      slNo: 2,
      subject: "Science",
      level: "Intermediate",
      teacher: "Bob Smith",
      views: 200,
    },
    {
      key: 2,
      slNo: 2,
      subject: "Science",
      level: "Intermediate",
      teacher: "Bob Smith",
      views: 200,
    },
    {
      key: 2,
      slNo: 2,
      subject: "Science",
      level: "Intermediate",
      teacher: "Bob Smith",
      views: 200,
    },
    // Add more shorts as needed
  ];

  return (
    <div className="border bg-white h-[360px] p-5 rounded-2xl">
      <h1 className="font-bold text-lg my-2">Top Shorts</h1>
      <Table columns={columns} dataSource={data?.slice(0, 3)} />
    </div>
  );
};

export default TopShortsTable;
