import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaRegBell } from "react-icons/fa6";
import { Badge, Button, Modal, Input } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [supportEmail, setSupportEmail] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  const handleAddSupportEmail = () => {
    // Logic to handle the support email submission
    console.log("Support Email:", supportEmail);
    // Close the modal after submission
    setIsModalVisible(false);
    setSupportEmail(""); // Clear the input
  };

  return (
    <div className="flex items-center gap-5 justify-end">
      <Button
        className="py-5 !hover:border-black border-black"
        onClick={() => setIsModalVisible(true)}
      >
        <FaPlus /> Support Email
      </Button>

      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={5}>
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link>

      <div className="flex gap-2 items-center justify-center border-4 p-1 rounded-full">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
          }}
          src={
            userData?.data?.profileImg
              ? `${import.meta.env.VITE_BASE_URL}${userData?.data?.profileImg}`
              : logo
          }
          alt="person-male--v2"
          className="clip"
        />
        <div className="flex pr-2 flex-col">
          <p className="text-xl">{userData?.data?.name || "Shakib Al Hasan"}</p>
          <p className="text-sm text-gray-500">{userData?.data?.role}</p>
        </div>
      </div>

      {/* Modal for adding support email */}
      <Modal
        title={
          <p className="text-xl text-center font-semibold">Add Support Email</p>
        }
        open={isModalVisible}
        onOk={handleAddSupportEmail}
        onCancel={() => setIsModalVisible(false)}
      >
        <div>
          <p className="text-base my-5 px-5 text-center font-semibold">
            This supported email address will users to contact you if they are
            facing any kind of issues
          </p>
        </div>
        <Input
          placeholder="Enter support email"
          className="my-5 px-5"
          value={supportEmail}
          onChange={(e) => setSupportEmail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Header;
