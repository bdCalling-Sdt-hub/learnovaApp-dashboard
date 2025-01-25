import React, { useState } from "react";
import { Table, Button, Space, Avatar, Select, Tooltip } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Dummy data for barbers
  const barbers = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "+123456789",
          address: "123 Main St, Cityville",
          subject: "Math",
          rating: 4.8,
          totalServices: 120,
          totalEarnings: "$6000",
          status: "Active",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
          complaint: null,
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "+123456780",
          address: "456 Secondary St, Townsville",
          subject: "Math",
          rating: 4.5,
          totalServices: 200,
          totalEarnings: "$8000",
          status: "Inactive",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
          complaint: null,
        },
        {
          id: "3",
          name: "Sam Wilson",
          email: "sam@example.com",
          phoneNumber: "+123456781",
          address: "789 Tertiary St, Suburb",
          subject: "Math",
          rating: 4.2,
          totalServices: 50,
          totalEarnings: "$2000",
          status: "Suspended",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
          complaint: {
            reason: "Violation of salon policies",
            amount: "$50",
          },
        },
        // Add more dummy barbers as needed
      ],
    },
  };

  const data = barbers?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Active":
            color = "green";
            break;
          case "Inactive":
            color = "red";
            break;
          case "Suspended":
            color = "orange";
            break;
          default:
            color = "gray";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Link to={`/teachers/profile/${record.id}`}>
            <Button className="bg-[#f7bc64] text-black border-none">
              Details
            </Button>
          </Link>

          <Button className="border border-red-600 text-red-700">
            <Tooltip title="This button will send a PATCH request to switch the status approve and restrict. The button will change according the status.">
              Approve/Restrict
            </Tooltip>
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Teachers</h1>
      <Table
        className="bg-white"
        pagination={{
          pageSize: pageSize,
        }}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
    </>
  );
};

export default Vendors;
