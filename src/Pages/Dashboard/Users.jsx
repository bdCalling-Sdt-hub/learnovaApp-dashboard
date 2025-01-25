import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import { useGetStudentsQuery } from "../../redux/apiSlices/userSlice";
import logo from "../../assets/logo.png";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(1);

  const { data: Users, isLoading } = useGetStudentsQuery(page);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }
  const userData = Users?.data;
  const { students } = userData;
  const { pagination } = userData;
  // console.log(userData);

  const columns = [
    {
      title: "S No.",
      dataIndex: "srl",
      key: "srl",
      render: (text, record, index) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profile || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;

        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span>{email ? email : "N/A"}</span>,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade) => <span>{grade ? grade : "N/A"}</span>,
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => {
        let color;
        switch (subscription?.duration) {
          case "Monthly":
            color = "orange";
            break;
          case "Yearly":
            color = "blue";
            break;
          default:
            color = "black";
        }

        return (
          <span style={{ color }}>
            {subscription ? subscription.duration : "N/A"}
          </span>
        );
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record._id}`}>
            <Button className="bg-[#fbc983] text-black border-none">
              Details
            </Button>
          </Link>
          <Button className="border ">Action</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Students</h1>
      <Table
        columns={columns}
        dataSource={students}
        rowKey="_id"
        pagination={{
          pageSize: pagination?.limit,
          total: pagination?.total,
          onChange: (page) => setPage(page),
        }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;
