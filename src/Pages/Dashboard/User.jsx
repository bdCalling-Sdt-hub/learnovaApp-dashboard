import React, { useState } from "react";
import { ConfigProvider, Input, Table, Select } from "antd";
import { useParams } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

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

  const initialData = [
    {
      key: "1",
      courseName: "Mathematics",
      level: "Advanced",
      grade: "10th",
      teacherName: "Mr. Smith",
      enrollDate: "01-09-2024",
      status: "Active",
    },
    {
      key: "2",
      courseName: "Science",
      level: "Intermediate",
      grade: "10th",
      teacherName: "Ms. Johnson",
      enrollDate: "15-08-2024",
      status: "Active",
    },
    {
      key: "3",
      courseName: "History",
      level: "Beginner",
      grade: "10th",
      teacherName: "Mr. Brown",
      enrollDate: "10-07-2024",
      status: "Completed",
    },
    {
      key: "4",
      courseName: "English Literature",
      level: "Advanced",
      grade: "10th",
      teacherName: "Ms. Taylor",
      enrollDate: "05-06-2024",
      status: "Active",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "Enroll Date",
      dataIndex: "enrollDate",
      key: "enrollDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={
            text === "Active"
              ? "text-green-600 font-semibold"
              : "text-gray-500 font-semibold"
          }
        >
          {text}
        </span>
      ),
    },
  ];

  const handleSearch = (value) => {
    const filteredData = initialData.filter((item) =>
      item.courseName.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    const filteredData = initialData.filter((item) =>
      value ? item.status === value : true
    );
    setData(filteredData);
  };

  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div>
      <div>
        <div className="flex items-center gap-10">
          <div className="flex gap-3 items-center">
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
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl mt-10 mb-5">Enrolled Courses</h1>
        <div className="flex justify-end gap-4 mb-4">
          <Search
            placeholder="Search courses"
            onSearch={handleSearch}
            style={{ width: 400 }}
          />
          <Select
            placeholder="Filter by status"
            allowClear
            value={statusFilter}
            onChange={handleStatusFilter}
            style={{ width: 200 }}
          >
            <Option value="Active">Active</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default User;
