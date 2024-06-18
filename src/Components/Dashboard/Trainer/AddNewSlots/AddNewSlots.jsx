import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Spinner from "../../../Common/Loading/Spinner";

const AddNewSlots = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [selectedDays, setSelectedDays] = useState([]);
  const [slotName, setSlotName] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [otherInfo, setOtherInfo] = useState("");

  const fetchTrainerDetails = async () => {
    const response = await axiosPublic.get(`/trainer-details/${user.email}`);
    return response.data;
  };

  const fetchClasses = async () => {
    const response = await axiosPublic.get("/classes");
    return response.data.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slotData = {
      trainerEmail: user.email,
      slotName,
      slotTime,
      selectedDays: selectedDays.map((day) => day.value),
      selectedClasses: selectedClasses.map((classItem) => classItem.value),
      otherInfo,
    };

    try {
      const response = await axiosPublic.post("/add-slot", slotData);
      // Assuming success handling
      queryClient.invalidateQueries(["slots"]);
      Swal.fire({
        title: "Success!",
        text: "Slot added successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const {
    data: trainerData,
    isLoading: trainerLoading,
    error: trainerError,
  } = useQuery({
    queryKey: ["trainerDetails", user.email],
    queryFn: fetchTrainerDetails,
  });

  const {
    data: classesData,
    isLoading: classesLoading,
    error: classesError,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: fetchClasses,
  });
  if (trainerLoading || classesLoading) return <Spinner />;
  if (trainerError || classesError) return <div>Error loading data</div>;

  // Ensure classesData is an array before mapping over it
  const classOptions = Array.isArray(classesData)
    ? classesData.map((classItem) => ({
        value: classItem.title,
        label: classItem.title,
      }))
    : [];

  const dayOptions = trainerData.availableDays.map((day) => ({
    value: day,
    label: day,
  }));

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Add New Slot
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-200"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={trainerData.fullName}
            readOnly
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            value={trainerData.email}
            readOnly
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-200"
          >
            Age
          </label>
          <input
            id="age"
            type="text"
            value={trainerData.age}
            readOnly
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="availableDays"
            className="block text-sm font-medium text-gray-200"
          >
            Available Days
          </label>
          <Select
            options={dayOptions}
            isMulti
            value={selectedDays}
            onChange={setSelectedDays}
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="slotName"
            className="block text-sm font-medium text-gray-200"
          >
            Slot Name
          </label>
          <input
            id="slotName"
            type="text"
            value={slotName}
            onChange={(e) => setSlotName(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="slotTime"
            className="block text-sm font-medium text-gray-200"
          >
            Slot Time
          </label>
          <input
            id="slotTime"
            type="text"
            value={slotTime}
            onChange={(e) => setSlotTime(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="selectedClasses"
            className="block text-sm font-medium text-gray-200"
          >
            Classes
          </label>
          <Select
            options={classOptions}
            isMulti
            value={selectedClasses}
            onChange={setSelectedClasses}
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="otherInfo"
            className="block text-sm font-medium text-gray-200"
          >
            Other Information
          </label>
          <textarea
            id="otherInfo"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300"
          >
            Add Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSlots;
