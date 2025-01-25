import React, { useState } from "react";
import { Table, Button, Space, Avatar, Select, Tooltip } from "antd";
import { Link } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import logo from "../../assets/logo.png";
import { useGetTeachersQuery } from "../../redux/apiSlices/userSlice";

const Vendors = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [page, setPage] = useState(1);

  const { data: allTeachersData, isLoading } = useGetTeachersQuery(page);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const teachersData = allTeachersData?.data;
  const { teachers } = teachersData;
  const { pagination } = teachersData;
  // console.log(teachers);

  // Dummy data for barbers

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text, record) => <p>{text || "N/A"}</p>,
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
          <Link to={`/teachers/profile/${record._id}`}>
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
        columns={columns}
        dataSource={teachers}
        rowKey="_id"
        pagination={{
          pageSize: pagination?.limit,
          total: pagination?.total,
          onChange: (page) => setPage(page),
        }}
      />
    </>
  );
};

export default Vendors;
