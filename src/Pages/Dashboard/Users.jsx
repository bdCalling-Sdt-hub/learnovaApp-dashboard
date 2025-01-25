import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Dummy data for users
  const users = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+123456789",
          address: "123 Main St, Springfield",
          totalServices: 12,
          grade: "Primary 6",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
          fine: 50,
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "+987654321",
          address: "456 Elm St, Springfield",
          totalServices: 5,
          grade: "Primary 5",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+192837465",
          address: "789 Oak St, Springfield",
          totalServices: 3,
          grade: "Primary 3",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
          fine: 30,
        },
        {
          id: "4",
          name: "Emily Johnson",
          email: "emily@example.com",
          phoneNumber: "+456789123",
          address: "321 Pine St, Springfield",
          totalServices: 8,
          grade: "Primary 4",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
          fine: 0,
        },
        {
          id: "5",
          name: "Michael Brown",
          email: "michael@example.com",
          phoneNumber: "+789456123",
          address: "654 Maple St, Springfield",
          totalServices: 6,
          grade: "Primary 6",
          subscription: "Monthly",
          profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
          id: "6",
          name: "Sophia Davis",
          email: "sophia@example.com",
          phoneNumber: "+123987654",
          address: "987 Birch St, Springfield",
          totalServices: 7,
          grade: "Primary 7",
          subscription: "Yearly",
          profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
          fine: 40,
        },
      ],
    },
  };

  const data = users?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profileImg || randomImg;
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
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Subscription",
      dataIndex: "subscription",
      key: "subscription",
      render: (subscription) => {
        let color;
        switch (subscription) {
          case "Monthly":
            color = "orange";
            break;
          case "Yearly":
            color = "blue";
            break;
          default:
            color = "green";
        }

        return <span style={{ color }}>{subscription}</span>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/user/profile/${record.id}`}>
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
        dataSource={data}
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;
