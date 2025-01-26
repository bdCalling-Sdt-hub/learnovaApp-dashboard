import React, { useEffect, useState } from "react";
import { ConfigProvider, Input, Table } from "antd";
import { useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGetStudentByIdQuery } from "../../redux/apiSlices/userSlice";
import moment from "moment";

const { Search } = Input;

const User = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { data: userData, isLoading } = useGetStudentByIdQuery(id);

  const studentData = userData?.data;
  // console.log(userData);

  useEffect(() => {
    if (studentData?.enrollCourses) {
      setData(studentData.enrollCourses);
    }
  }, [studentData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="Loading" />
      </div>
    );
  }

  // Set initial data when userData is fetched

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = studentData?.enrollCourses.filter((item) =>
      item.course.title.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: ["course", "title"],
      key: "courseName",
    },
    {
      title: "Level",
      dataIndex: ["course", "level"],
      key: "level",
    },
    {
      title: "Grade",
      dataIndex: ["course", "grade"],
      key: "grade",
    },
    {
      title: "Teacher Name",
      dataIndex: ["course", "teacher", "name"],
      key: "teacherName",
    },
    {
      title: "Enroll Date",
      dataIndex: ["course", "createdAt"],
      key: "createdAt",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
  ];

  const imgUrl =
    studentData?.profile ||
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
              alt="Profile"
            />
            <div>
              <h1 className="text-2xl font-bold">{studentData?.name}</h1>
              <p className="text-sm text-gray-400">
                User ID: #{studentData?._id}
              </p>
            </div>
          </div>
        </div>
        <div className="grid my-5 grid-cols-2 gap-5 w-[80%]">
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Name
            </h1>
            <p className="text-lg my-2">{studentData?.name || "Unknown"}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Email
            </h1>
            <p className="text-lg my-2">{studentData?.email || "N/A"}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Current Grade
            </h1>
            <p className="text-lg my-2">{studentData?.grade || "N/A"}</p>
          </div>
          <div className="p-3 bg-white h-20 rounded-2xl shadow-sm">
            <h1 className="font-semibold text-sm border-b-2 border-dashed">
              Current School
            </h1>
            <p className="text-lg my-2">{studentData?.school || "N/A"}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl mt-10 mb-5">Enrolled Courses</h1>
        <div className="flex justify-end gap-4 mb-4">
          <Search
            placeholder="Search courses"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 400 }}
          />
        </div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data} // Use filtered data
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default User;
