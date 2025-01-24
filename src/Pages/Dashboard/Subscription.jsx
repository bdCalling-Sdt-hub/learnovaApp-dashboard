import { useState } from "react";
import { Button, Modal, Input } from "antd";
import SubscriptionStatisticsChart from "../../components/ui/Subscription/SubscriptionStatisticsChart";
import { FaPlus } from "react-icons/fa6";
import SubscriptionManagement from "../../components/ui/Subscription/SubscriptionManagement";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for toggling edit mode
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [plans, setPlans] = useState([
    {
      duration: "Yearly",
      details: {
        price: "$100",
        heading: "Yearly Subscription",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
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
  ]);

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
    setIsEditMode(false); // Set to view mode initially
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

  const handleEditClick = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const handleSaveEdit = () => {
    // Save the edited plan details here (e.g., update state)
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.duration === selectedPlan.duration
          ? { ...plan, details: newPlan }
          : plan
      )
    );
    setIsEditMode(false); // Switch back to view mode after saving
  };

  return (
    <div>
      <div className="flex gap-5 w-full h-[400px]">
        <div className="w-[65%] bg-white p-5 border rounded-2xl">
          <h1 className="font-bold p-4">Subscription Statistics</h1>
          <SubscriptionStatisticsChart />
        </div>
        <div className="w-[35%] bg-white border rounded-2xl h-[400px] flex flex-col">
          <div className="p-5 rounded-2xl flex-grow">
            <h1 className="font-bold">Subscription Plans</h1>
            <div className="flex my-5 gap-3 justify-between">
              {plans.map((plan) => (
                <div
                  className="border flex p-3 h-[320px] rounded-2xl bg-slate-100 flex-col items-center justify-between w-[50%]"
                  key={plan.duration}
                >
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold">{plan.duration}</h1>
                    <h1 className="font-bold text-2xl">
                      {plan.details.price}{" "}
                      <span className="text-sm text-base">
                        /{plan.duration}
                      </span>
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-justify mt-5 text-sm">
                      {plan.details.description?.slice(0, 150)}...
                    </p>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button
                      className="w-full"
                      onClick={() => showModal(plan)}
                      type="primary"
                    >
                      Details
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        showModal(plan);
                        setIsEditMode(true); // Enable edit mode when clicking "Edit"
                      }}
                      type="primary"
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <SubscriptionManagement />
      </div>

      {/* Modal for plan details or edit */}
      <Modal
        title={
          <p className="text-center text-2xl">
            {selectedPlan?.details?.heading}
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPlan && (
          <div>
            {isEditMode ? (
              // Edit Modal Form
              <div>
                <Input
                  value={newPlan.heading}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, heading: e.target.value })
                  }
                  placeholder="Subscription Plan Heading"
                />
                <Input
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, price: e.target.value })
                  }
                  placeholder="Price"
                  className="my-2"
                />
                <Input.TextArea
                  value={newPlan.description}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, description: e.target.value })
                  }
                  placeholder="Description"
                  className="my-2"
                />
                <Input
                  value={newPlan.features}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, features: e.target.value })
                  }
                  placeholder="Features"
                  className="my-2"
                />
                <Button
                  onClick={handleSaveEdit}
                  type="primary"
                  className="mt-4"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              // View Details
              <div>
                <div className="flex justify-between my-10 items-center">
                  <p className="font-bold mx-auto text-3xl">
                    {selectedPlan.details.price}
                    <span className="text-base">/{selectedPlan.duration}</span>
                  </p>
                </div>
                <p className="my-5">{selectedPlan.details.description}</p>
                <div>
                  <h1 className="font-bold text-lg">Features</h1>
                  <ul className="list-disc pl-5">
                    {selectedPlan.details.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Subscription;
