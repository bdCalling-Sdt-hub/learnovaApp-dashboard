import { useState } from "react";
import { Button, Modal, Input } from "antd";
import SubscriptionStatisticsChart from "../../components/ui/Subscription/SubscriptionStatisticsChart";
import { FaPlus } from "react-icons/fa6";
import SubscriptionManagement from "../../components/ui/Subscription/SubscriptionManagement";

const subscriptionPlans = [
  {
    duration: "Yearly",
    details: {
      price: "$100",
      heading: "Yearly Subscription",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      features: [
        "Unlimited access to all services",
        "Priority support",
        "Access to exclusive content",
        "Discount on additional services",
      ],
    },
  },
  {
    duration: "Monthly",
    details: {
      price: "$20",
      heading: "Monthly Subscription",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      features: [
        "Unlimited access to all services",
        "Priority support",
        "Access to exclusive content",
        "Discount on additional services",
      ],
    },
  },
];

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    duration: "",
    price: "",
    heading: "",
    description: "",
    features: "",
  });

  const showModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleAddModalCancel = () => {
    setIsAddModalOpen(false);
    setNewPlan({
      duration: "",
      price: "",
      heading: "",
      description: "",
      features: "",
    });
  };

  const handleAddPlan = () => {
    const featuresArray = newPlan.features.split(",").map((f) => f.trim());
    subscriptionPlans.push({
      duration: newPlan.duration,
      details: {
        price: newPlan.price,
        heading: newPlan.heading,
        description: newPlan.description,
        features: featuresArray,
      },
    });
    handleAddModalCancel();
  };

  return (
    <div>
      <div className="flex gap-5 w-full h-[400px]">
        <div className="w-[70%] bg-white p-5 border rounded-2xl">
          <h1 className="font-bold p-4">Subscription Statistics</h1>
          <SubscriptionStatisticsChart />
        </div>
        <div className="w-[30%] bg-white border rounded-2xl h-[400px] flex flex-col">
          <div className="p-5 rounded-2xl flex-grow">
            <h1 className="font-bold">Subscription Plans</h1>
            <div className="flex flex-col my-5 gap-3 justify-between">
              {subscriptionPlans.map((plan) => (
                <div className="flex gap-5 justify-between" key={plan.duration}>
                  <Button className="px-8 w-1/3 !hover:border-slate-500 !border-slate-500 py-5">
                    {plan.duration}
                  </Button>
                  <Button
                    className="px-8 w-1/3 !hover:border-slate-500 !border-slate-500 py-5"
                    onClick={() => showModal(plan.details)}
                  >
                    Details
                  </Button>
                  <Button className="px-8 text-red-500 w-1/3 !hover:border-slate-500 !border-slate-500 py-5">
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="px-8 bg-primary mb-5 text-white w-[90%] mx-auto !hover:border-slate-500 !border-slate-500 py-5 mt-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            <FaPlus /> Add New Plan
          </Button>
        </div>
      </div>

      <div className="my-5">
        <SubscriptionManagement />
      </div>

      {/* Modal for plan details */}
      <Modal
        title={<p className="text-center text-2xl">{selectedPlan?.heading}</p>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPlan && (
          <div>
            <div className="flex justify-between my-10 items-center">
              <p className="font-bold mx-auto text-3xl">
                {selectedPlan.price}
                <span className="text-base">/Year</span>
              </p>
            </div>
            <p className="my-5">{selectedPlan.description}</p>
            <div>
              <h1 className="font-bold text-lg">Features</h1>
              <ul className="list-disc pl-5">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal for adding new plan */}
      <Modal
        title={<p className="text-center text-2xl">Add New Plan</p>}
        open={isAddModalOpen}
        onCancel={handleAddModalCancel}
        onOk={handleAddPlan}
      >
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Duration (e.g., Yearly, Monthly)"
            value={newPlan.duration}
            onChange={(e) =>
              setNewPlan({ ...newPlan, duration: e.target.value })
            }
          />
          <Input
            placeholder="Price (e.g., $100)"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
          />
          <Input
            placeholder="Heading (e.g., Yearly Subscription)"
            value={newPlan.heading}
            onChange={(e) =>
              setNewPlan({ ...newPlan, heading: e.target.value })
            }
          />
          <Input.TextArea
            placeholder="Description"
            value={newPlan.description}
            onChange={(e) =>
              setNewPlan({ ...newPlan, description: e.target.value })
            }
          />
          <Input.TextArea
            placeholder="Features (comma-separated)"
            value={newPlan.features}
            onChange={(e) =>
              setNewPlan({ ...newPlan, features: e.target.value })
            }
          />
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
