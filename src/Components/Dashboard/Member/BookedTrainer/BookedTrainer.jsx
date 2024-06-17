import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import Spinner from "../../../Common/Loading/Spinner";
import { FaStar } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const BookedTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth(); // Get the current user info from AuthContext
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const image = user.photoURL;
  const name = user.displayName;

  const fetchBookedTrainerDetails = async (email) => {
    const response = await axiosPublic.get(`/booked-trainer/${email}`);
    return response.data;
  };

  const fetchClassesAndSlots = async () => {
    const response = await axiosPublic.get(`/trainer-classes-slots`);
    return response.data;
  };

  const {
    data: trainerData,
    error: trainerError,
    isLoading: trainerLoading,
  } = useQuery({
    queryKey: ["bookedTrainer", user.email],
    queryFn: () => fetchBookedTrainerDetails(user.email),
  });

  const {
    data: classesAndSlotsData,
    error: classesAndSlotsError,
    isLoading: classesAndSlotsLoading,
  } = useQuery({
    queryKey: ["classesAndSlots"],
    queryFn: () => fetchClassesAndSlots(),
  });

  if (!trainerData || !trainerData.trainer) {
    return <div>No trainer data available</div>;
  }
  if (trainerLoading || classesAndSlotsLoading) return <Spinner />;
  if (trainerError || classesAndSlotsError)
    return <div>Error loading data</div>;

  const handleFeedbackSubmit = async () => {
    try {
      await axiosPublic.post(`/submit-feedback`, {
        userEmail: user.email,
        feedback,
        name,
        image,
        rating,
      });
      Swal.fire({
        title: "Feedback submitted successfully!",
        icon: "success",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      setShowModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error submitting feedback!",
        text: error.message,
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Booked Trainer
      </h2>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#981840]">Trainer Info</h3>
          <p>Name: {trainerData.trainer.name}</p>
          <p>Email: {trainerData.trainer.email}</p>
          <p>Experience: {trainerData.trainer.experience} years</p>
          <p>Bio: {trainerData.trainer.bio}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#981840]">Classes Info</h3>
          {classesAndSlotsData?.classes?.map((classInfo, index) => (
            <div key={index}>
              <p>Class: {classInfo.title}</p>
              <p>Description: {classInfo.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#981840]">Slot Info</h3>
          {classesAndSlotsData?.slots?.map((slot, index) => (
            <div key={index}>
              <p>{slot.availableSlots}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#981840]">Other Info</h3>
          <p>{trainerData.booking.additionalInfo}</p>
        </div>
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300"
          >
            Review
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#771232] p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-bold text-gray-200 mb-4">
              Submit Feedback
            </h3>
            <textarea
              className="mt-4 w-full p-2 border bg-[#2a0712] border-none rounded-md"
              placeholder="Provide feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex items-center mt-4">
              <p className="mr-2">Rating:</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-400 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookedTrainer;
