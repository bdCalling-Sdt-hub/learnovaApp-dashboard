import React from "react";
import { Avatar, Card, Table, Space, Button, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import randomImg from "../../assets/randomProfile2.jpg";
import {
  useApproveRestrictTeacherMutation,
  useGetTeacherByIdQuery,
} from "../../redux/apiSlices/userSlice";
import logo from "../../assets/logo.png";
import moment from "moment";
import toast from "react-hot-toast";

const Vendor = () => {
  const { id } = useParams();

  const {
    data: singleTeacher,
    isLoading,
    refetch,
  } = useGetTeacherByIdQuery(id);
  const [approveRestrictTeacher] = useApproveRestrictTeacherMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }
  const teacher = singleTeacher?.data;
  // console.log(teacher);

  const columns = [
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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Publish Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Views",
      dataIndex: "totalViews",
      key: "totalViews",
    },
  ];

  const handleChangeStatus = async (record) => {
    let data = {};
    if (record.status === "Approved") {
      data = {
        status: "Restricted",
      };
    } else {
      data = {
        status: "Approved",
      };
    }

    try {
      const res = await approveRestrictTeacher({
        id: record._id,
        data,
      }).unwrap();
      if (res.success) {
        toast.success("Status changed successfully");
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className=" mx-auto p-4">
      <div className="mb-4">
        <div className="flex gap-5 items-center">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className=" border-4 p-1 rounded-full">
              <img
                src={
                  teacher?.profile?.startsWith("http")
                    ? teacher.profile
                    : `${import.meta.env.VITE_BASE_URL}${teacher.profile}` ||
                      randomImg
                }
                alt={teacher.name}
                size={100}
                className="border-2 w-[200px] h-[200px] rounded-full  border-gray-300"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {teacher.name}
              </h2>
            </div>
          </div>
          <div className="ml-4 text-xl flex flex-col gap-1">
            <p className="text-gray-600">
              <span className="font-semibold">Email: </span>
              {teacher.email || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Subject: </span>
              {teacher.designation || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Courses:</span>{" "}
              {teacher?.courses?.length || 0}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total Earnings:</span>{" "}
              {teacher.totalEarnings || 0}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold"> Status:</span>{" "}
              <span
                className={`px-2 py-1  ${
                  teacher.status === "Active"
                    ? "text-green-500"
                    : teacher.status === "Inactive"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {teacher.status}
              </span>
            </p>
          </div>
          <div className="flex ms-auto items-start justify-end">
            <Button
              hidden={teacher.status === "Approved"}
              onClick={() => handleChangeStatus(teacher)}
              className={`border-green-500 py-5 px-8 text-green-500 ${
                teacher.status === "!Approved"
                  ? "border-green-500 text-green-500"
                  : ""
              }`}
            >
              Approve
            </Button>
          </div>
        </div>
      </div>

      <Card title="Courses" className="shadow-lg mt-20">
        <Table columns={columns} dataSource={teacher?.courses} rowKey="_id" />
      </Card>
    </div>
  );
};

export default Vendor;
