import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import logo from "../../assets/randomProfile2.jpg";
import { useAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { data: userData, isLoading } = useAdminProfileQuery(undefined);

  useEffect(() => {
    const socket = io("http://10.0.80.75:6002", {
      query: {
        token: localStorage.getItem("authToken"),
      },
    });
    socket.on("getNotification", (notification) => {
      console.log(notification);
      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }
  const adminData = userData?.data;
  // console.log(adminData);

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="/notification" className="h-fit mt-[10px]">
        <Badge count={notificationCount}>
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
            adminData?.profile?.startsWith("http")
              ? adminData?.profile
              : `${import.meta.env.VITE_BASE_URL}${adminData?.profile}` || logo
          }
          alt="person-male--v2"
          className="clip"
        />
        <div className="flex pr-2 flex-col">
          <p className="text-xl">{adminData?.name || "Shakib Al Hasan"}</p>
          <p className="text-sm text-gray-500">{adminData?.role || "Admin"}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
