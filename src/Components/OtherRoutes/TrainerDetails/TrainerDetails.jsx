import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaClock, FaStar, FaArrowLeft } from "react-icons/fa";
import Spinner from "../../Common/Loading/Spinner";

const fetchTrainerDetails = async (trainerName) => {
  const response = await axios.get(`https://gym-management-livid.vercel.app/trainers/${trainerName}`); // Replace with your API endpoint
  return response.data;
};

const TrainerDetails = () => {
  const { name } = useParams();

  const { data: trainer, error, isLoading } = useQuery({
    queryKey: ["trainerDetails", name],
    queryFn: () => fetchTrainerDetails(name),
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading trainer details</div>;

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <Link to="/all-trainer" className="text-teal-500 hover:text-teal-400 mb-4 inline-block">
        <FaArrowLeft className="inline mr-2" /> Back to Trainers
      </Link>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <img src={trainer.photo} alt={trainer.name} className="h-64 w-64 object-cover rounded-full mx-auto mb-4 lg:mb-0" />
            <h2 className="text-3xl font-bold text-center text-[#981840]">{trainer.name}</h2>
            <p className="text-center text-gray-400 mt-4">{trainer.bio}</p>
            <div className="flex items-center justify-center text-gray-500 mt-4">
              <FaStar className="mr-2" />
              <p className="font-semibold">Expertise: {trainer.expertise}</p>
            </div>
            <div className="flex items-center justify-center text-gray-500 mt-4">
              <FaClock className="mr-2" />
              <p className="font-semibold">Experience: {trainer.experience} years</p>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            <h3 className="text-2xl font-bold mb-4">Available Slots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trainer.availableSlots.split(',').map((slot, index) => (
                <Link to={`/book/${trainer.name}/${slot.trim()}`} key={index} className="bg-[#981840] text-white py-2 px-4 rounded-lg hover:bg-[#790f32] transition duration-300 text-center">
                  {slot.trim()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <Link to="/BecomeATrainer" className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300">
          Become a Trainer
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
