import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const daysOptions = [
  { value: "Sun", label: "Sunday" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
];

const skillsOptions = [
  { value: "Strength Training", label: "Strength Training" },
  { value: "Conditioning", label: "Conditioning" },
  { value: "Yoga", label: "Yoga" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Pilates", label: "Pilates" },
  { value: "Flexibility", label: "Flexibility" },
  { value: "Cardio", label: "Cardio" },
];

const BecomeATrainer = () => {
  const { user } = useAuth(); // Assuming you have an AuthContext to get user info
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [profileImage, setProfileImage] = useState(""); // Image URL
  const [skills, setSkills] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTime, setAvailableTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      email: user.email,
      age,
      profileImage, // Image URL
      skills: skills.map((skill) => skill.value),
      availableDays: availableDays.map((day) => day.value),
      availableTime,
      status: "pending",
    };

    try {
      const response = await axios.post("http://localhost:5000/apply-trainer", formData);
      if (response.status === 200) {
       Swal.fire({
          title: "Application submitted successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Become a Trainer
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
            onChange={(e) => setFullName(e.target.value)}
            required
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
            type="email"
            defaultValue={user.email}
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
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-200"
          >
            Profile Image URL
          </label>
          <input
            id="profileImage"
            type="text"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Skills
          </label>
          <Select
            options={skillsOptions}
            isMulti
            onChange={setSkills}
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Available Days
          </label>
          <Select
            options={daysOptions}
            isMulti
            onChange={setAvailableDays}
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="availableTime"
            className="block text-sm font-medium text-gray-200"
          >
            Available Time
          </label>
          <input
            id="availableTime"
            type="text"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            required
            placeholder="e.g., 9am-5pm"
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeATrainer;
