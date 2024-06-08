import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";



const AppliedTrainers = () => {
  const axiosPublic = useAxiosPublic();
  const fetchAppliedTrainers = async () => {
    const response = await axiosPublic.get("/get-trainers");
    return response.data;
  };

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchAppliedTrainers,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading applied trainers</div>;

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-[#981840] mb-8">
        Applied Trainers
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {data.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-200">
              {trainer.fullName}
            </h3>
            <p className="text-gray-400">{trainer.email}</p>
            <Link
              to={`/dashboard/trainer-details/${trainer._id}`}
              className="text-teal-500 hover:text-teal-400 mt-4 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTrainers;
