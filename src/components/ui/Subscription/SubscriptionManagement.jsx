import { Table, Button, Avatar } from "antd";
import { Link } from "react-router-dom";

const SubscriptionManagement = () => {
  // Dummy data with avatar images
  const data = [
    {
      key: "1",
      name: "John Doe",
      status: "Active",
      plan: "Monthly",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      key: "2",
      name: "Jane Smith",
      status: "Inactive",
      plan: "Yearly",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      key: "3",
      name: "Alice Johnson",
      status: "Active",
      plan: "Monthly",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      key: "4",
      name: "Bob Brown",
      status: "Active",
      plan: "Yearly",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  // Define columns for the table
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-center">
          <Avatar src={record.avatar} alt={name} />
          <span className="ml-2">{name}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/user/profile/${record.id}`}>
          <Button className="bg-secondary text-black border-none" type="link">
            Details
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-5 bg-white rounded-2xl my-5">
      <h1 className="font-bold text-xl mb-5">Subscription Management</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default SubscriptionManagement;
