import React from "react";
import { Table } from "antd";

const TopShortsTable = ({ topShorts }) => {
  // console.log(topShorts);

  const columns = [
    {
      title: "Sl No",
      dataIndex: "slNo",
      key: "slNo",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
    <div className="border bg-white h-[360px] p-5 rounded-2xl">
      <h1 className="font-bold text-lg my-2">Top Shorts</h1>
      <Table
        columns={columns}
        pagination={false}
        dataSource={topShorts?.slice(0, 4)}
        rowKey="_id"
      />
    </div>
  );
};

export default TopShortsTable;
