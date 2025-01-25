import { useState } from "react";
import { Button, Modal, Input } from "antd";
import SubscriptionStatisticsChart from "../../components/ui/Subscription/SubscriptionStatisticsChart";
import SubscriptionManagement from "../../components/ui/Subscription/SubscriptionManagement";
import {
  useEditSubscriptionPackageMutation,
  useGetSubscriptionDataQuery,
} from "../../redux/apiSlices/subscriptionSlice";
import logo from "../../assets/logo.png";
import toast from "react-hot-toast";

const Subscription = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newPlan, setNewPlan] = useState({
    price: "",
    description: "",
    features: "",
  });

  const { data: subscriptionData, isLoading } = useGetSubscriptionDataQuery();
  const [editSubscriptionPackage] = useEditSubscriptionPackageMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={logo} alt="Loading..." />
      </div>
    );
  }

  const subscription = subscriptionData?.data;
  const { packages } = subscription;

  const showDetailModal = (plan) => {
    setSelectedPlan(plan);
    setIsDetailModalOpen(true);
  };

  const showEditModal = (plan) => {
    setSelectedPlan(plan);
    setNewPlan({
      price: plan?.price || "",
      description: plan?.description || "",
      features: plan?.feature.join(", ") || "",
    });
    setIsEditModalOpen(true);
  };

  const handleDetailModalCancel = () => setIsDetailModalOpen(false);
  const handleEditModalCancel = () => setIsEditModalOpen(false);

  const handleSaveEdit = async () => {
    const data = {
      price: newPlan.price,
      description: newPlan.description,
      features: newPlan.features.split(", "),
    };

    try {
      const response = await editSubscriptionPackage({
        id: selectedPlan?._id,
        data: data,
      }).unwrap();
      if (response.success) {
        toast.success("Subscription plan updated successfully");
        refetch();
      }
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update subscription plan:", error);
      toast.error("Failed to update subscription plan");
    }
  };

  return (
    <div>
      <div className="flex gap-5 w-full h-[400px]">
        <div className="w-[65%] bg-white p-5 border rounded-2xl">
          <h1 className="font-bold p-4">Subscription Statistics</h1>
          <SubscriptionStatisticsChart
            oneYearData={subscription?.subscriptionsArray}
          />
        </div>
        <div className="w-[35%] bg-white border rounded-2xl h-[400px] flex flex-col">
          <div className="p-5 rounded-2xl flex-grow">
            <h1 className="font-bold">Subscription Plans</h1>
            <div className="flex my-5 gap-3 justify-between">
              {packages?.map((plan) => (
                <div
                  className="border flex p-3 h-[320px] rounded-2xl bg-slate-100 flex-col items-center justify-between w-[50%]"
                  key={plan?.duration}
                >
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="font-bold">{plan?.duration}</h1>
                    <h1 className="font-bold text-2xl">
                      {plan?.price}{" "}
                      <span className="text-sm">/{plan?.duration}</span>
                    </h1>
                  </div>
                  <p className="text-justify mt-5 text-md">
                    {plan?.description?.slice(0, 150)}...
                  </p>
                  <div className="space-y-2 w-full">
                    <Button
                      className="w-full"
                      onClick={() => showDetailModal(plan)}
                      type="primary"
                    >
                      Details
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => showEditModal(plan)}
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

      {/* Detail Modal */}
      <Modal
        title="Subscription Plan Details"
        open={isDetailModalOpen}
        onCancel={handleDetailModalCancel}
        footer={null}
      >
        {selectedPlan && (
          <div>
            <div className="flex justify-between my-10 items-center">
              <p className="font-bold mx-auto text-3xl">
                {selectedPlan?.price}
                <span className="text-base">/{selectedPlan?.duration}</span>
              </p>
            </div>
            <p className="my-5">{selectedPlan?.description}</p>
            <div>
              <h1 className="font-bold text-lg">Features</h1>
              <ul className="list-disc pl-5">
                {selectedPlan?.feature?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Subscription Plan"
        open={isEditModalOpen}
        onCancel={handleEditModalCancel}
        footer={null}
      >
        <div>
          <Input
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
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
            placeholder="Features (comma-separated)"
            className="my-2"
          />
          <Button onClick={handleSaveEdit} type="primary" className="mt-4">
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Subscription;
