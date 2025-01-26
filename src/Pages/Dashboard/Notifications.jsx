import React, { useEffect, useState } from "react";
import { ConfigProvider, Pagination } from "antd";
import Title from "../../components/common/Title";
import logo from "../../assets/logo.png";
import {
  useNotificationQuery,
  useReadNotificationMutation,
  useReadSingleNotificationMutation,
} from "../../redux/apiSlices/notificationSlice";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const notificationsData = [
  {
    id: 1,
    sender: "Sanchez Haro Manuel",
    message: "Started a new trip at 5 PM. Trip No.56 started from Mexico City.",
    timestamp: "1hr ago",
    avatar:
      "https://img.freepik.com/free-photo/everything-is-okay-cheerful-friendly-looking-caucasian-guy-with-moustache-beard-raising-hand-with-ok-great-gesture-giving-approval-like-having-situation-control_176420-22386.jpg",
  },
  {
    id: 2,
    sender: "Maria Gonzalez",
    message: "Scheduled a meeting for tomorrow at 10 AM.",
    timestamp: "2hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/young-pretty-girl-with-hands-crossed-smiling_176420-20051.jpg",
  },
  {
    id: 3,
    sender: "James Smith",
    message: "Submitted a travel report for approval.",
    timestamp: "3hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/handsome-serious-young-man-posing-studio-isolated-gray-wall_176420-21306.jpg",
  },
  {
    id: 4,
    sender: "Sarah Connor",
    message: "Trip No.89 was successfully completed.",
    timestamp: "4hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/portrait-beautiful-young-woman_176420-20333.jpg",
  },
  {
    id: 5,
    sender: "Carlos Rivera",
    message: "Reviewed your recent trip itinerary.",
    timestamp: "5hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/handsome-young-man-smiling_176420-23278.jpg",
  },
  {
    id: 6,
    sender: "Emily Davis",
    message: "Requested a trip report summary.",
    timestamp: "6hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/stylish-young-girl-with-glasses-smiling_176420-20356.jpg",
  },
  {
    id: 7,
    sender: "John Doe",
    message: "Updated trip No.45 status to 'Completed'.",
    timestamp: "7hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/young-man-smiling-against-grey-wall_176420-20255.jpg",
  },
  {
    id: 8,
    sender: "Sophia Martinez",
    message: "Trip No.67 needs your review.",
    timestamp: "8hrs ago",
    avatar:
      "https://img.freepik.com/free-photo/beautiful-young-woman-smiling-happy_176420-23282.jpg",
  },
];

const Notifications = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const {
    data: getNotifications,
    isLoading,
    refetch,
  } = useNotificationQuery(page);
  const [readSingleNotification] = useReadSingleNotificationMutation();
  const [readNotification] = useReadNotificationMutation();

  useEffect(() => {
    refetch();
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="" />
      </div>
    );
  }

  const notificationData = getNotifications?.data;
  const { notifications } = notificationData;
  const { pagination } = notificationData;

  console.log(notificationData);

  const handleReadSingleNotification = async (notification) => {
    const redirectTo = `/${
      notification?.screen === "REGISTER" ? "teachers/profile" : "user/profile"
    }`;

    try {
      const response = await readSingleNotification(notification?._id).unwrap();
      if (response.success) {
        toast.success("Redirecting to " + redirectTo);
        refetch();
        navigate(`${redirectTo}/${notification?.referenceId}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const readAllNotifications = async () => {
    try {
      const response = await readNotification().unwrap();
      if (response.success) {
        toast.success("All notifications read successfully");
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Title className="text-[22px]">All Notifications</Title>
        <button
          onClick={() => readAllNotifications()}
          className="bg-[#023F86] text-white h-10 px-4 rounded-md"
        >
          Read All
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-white p-4 rounded-lg">
        {notifications
          ?.slice()
          ?.reverse()
          ?.map((notification) => {
            return (
              <div
                onClick={() => handleReadSingleNotification(notification)}
                key={notification._id}
                className={`border-b-[1px] cursor-pointer pb-2 p-5 ${
                  notification?.read === true ? "" : "font-bold bg-slate-100"
                } border-[#d9d9d9] flex items-center gap-3`}
              >
                <div>
                  <p>{notification?.text}</p>
                  <p
                    className="text-[14px]"
                    style={{ color: "gray", marginTop: "4px" }}
                  >
                    {moment(notification?.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex items-center justify-center mt-6">
        <Pagination
          total={pagination?.total}
          pageSize={pagination?.limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Notifications;
