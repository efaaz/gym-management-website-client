import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import Swal from "sweetalert2";

const fetchActivityLog = async () => {
  const response = await axios.get("http://localhost:5000/activity-log");
  return response.data;
};

const ActivityLog = () => {
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { data: trainers, error, isLoading } = useQuery({
    queryKey: ["activityLog"],
    queryFn: fetchActivityLog,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading activity log</div>;

  const handleEyeClick = (feedback) => {
    setFeedback(feedback);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-[#981840] mb-8">Activity Log</h2>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {trainers.map((trainer) => (
              <tr key={trainer._id}>
                <td className="px-6 py-4 text-sm text-gray-200">{trainer.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-200">{trainer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-200 capitalize">{trainer.status}</td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  {trainer.status === "rejected" && (
                    <FaEye
                      className="cursor-pointer text-teal-500 hover:text-teal-400"
                      onClick={() => handleEyeClick(trainer.feedback)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Rejection Feedback</h3>
            <p className="text-gray-600">{feedback}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
