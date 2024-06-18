import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Spinner from "../../../Common/Loading/Spinner";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaClock, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AdminTrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const fetchTrainerDetails = async (id) => {
    const response = await axiosSecure.get(`/applied-trainers/${id}`);
    return response.data;
  };

  const {
    data: trainer,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trainer", id],
    queryFn: () => fetchTrainerDetails(id),
  });

  const updateTrainerStatus = async ({ id, status, feedback }) => {
    const email = trainer.email; // Ensure email is only set when trainer data is available
    const response = await axiosPublic.put(`/update-trainer-status/${id}`, {
      status,
      feedback,
      email,
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: updateTrainerStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["appliedTrainers"]);
      queryClient.invalidateQueries(["trainer", id]);
      Swal.fire({
        title: "Success!",
        text: "Trainer status updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/applied-trainers");
      });
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading trainer details</div>;

  const handleConfirm = () => {
    mutation.mutate({ id, status: "trainer" });
  };

  const handleReject = () => {
    mutation.mutate({ id, status: "rejected", feedback });
    setShowModal(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-[#981840] mb-8">
        Trainer Details
      </h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={trainer.profileImage}
          alt={trainer.fullName}
          className="object-cover rounded-full mx-auto mb-4 lg:mb-0"
        />
        <h2 className="text-3xl font-bold text-center text-[#981840]">
          {trainer.fullName}
        </h2>
        <p className="text-gray-400 text-center">Email: {trainer.email}</p>
        <p className="text-gray-400 text-center">Age: {trainer.age}</p>
        <div className="flex items-center justify-center text-gray-500 mt-4">
          <FaStar className="mr-2" />
          <p className="font-semibold">
            Expertise: {trainer.skills.join(", ")}
          </p>
        </div>
        <div className="flex items-center justify-center text-gray-500 mt-4">
          <FaClock className="mr-2" />
          <p className="text-gray-400">
            Available Time: {trainer.availableTime}
          </p>
        </div>
        <p className="text-gray-400 text-center">
          Available Days: {trainer.availableDays.join(", ")}
        </p>
        <div className="flex space-x-4 mt-8 justify-center">
          <button
            onClick={handleConfirm}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-400 transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300"
          >
            Reject
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#530d23] p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold text-gray-300 mb-4">
              Reject Trainer
            </h3>
            <div className="flex flex-col items-center">
              <img
                src={trainer.profileImage}
                alt={trainer.fullName}
                className="object-cover rounded-full mx-auto mb-4 lg:mb-0"
              />
              <h2 className="text-3xl font-bold text-center text-gray-300">
                {trainer.fullName}
              </h2>
              <p className="text-gray-300 text-center">
                Email: {trainer.email}
              </p>
              <p className="text-gray-300 text-center">Age: {trainer.age}</p>
              <textarea
                className="mt-4 w-full text-black p-2 border border-gray-300 rounded-md"
                placeholder="Provide feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTrainerDetails;
