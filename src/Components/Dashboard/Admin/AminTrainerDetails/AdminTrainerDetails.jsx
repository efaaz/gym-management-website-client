import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../Common/Loading/Spinner";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { FaClock, FaStar } from "react-icons/fa";

const AdminTrainerDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const fetchTrainerDetails = async (id) => {
    const response = await axiosPublic.get(`/applied-trainers/${id}`);
    return response.data;
  };

  const {
    data: trainer,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trainer", id], // Include id in the query key
    queryFn: () => fetchTrainerDetails(id),
  });

  const updateTrainerStatus = async ({ id, status }) => {
    const response = await axiosPublic.put(`/update-trainer-status/${id}`, {
      status,
    });
    return response.data;
  };


  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading trainer details</div>;

  const handleStatusChange = (status) => {
    mutation.mutate({ id, status });
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
          className=" object-cover rounded-full mx-auto mb-4 lg:mb-0"
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
            onClick={() => handleStatusChange("confirmed")}
            className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-400 transition duration-300"
          >
            Confirm
          </button>
          <button
            onClick={() => handleStatusChange("rejected")}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition duration-300"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTrainerDetails;
