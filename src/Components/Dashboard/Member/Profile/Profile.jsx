import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import Spinner from "../../../Common/Loading/Spinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const { user, updateProfile, loading } = useAuth();
  const [name, setName] = useState(user.displayName || "");
  const [profilePicture, setProfilePicture] = useState(user.photoURL || "");
  const [otherInfo, setOtherInfo] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName);
      setProfilePicture(user.photoURL);
    }
  }, [user]);

  const fetchProfile = async () => {
    const response = await axiosSecure.get(`/profile/${user.email}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    onSuccess: (data) => {
      setOtherInfo(data.otherInfo || "");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { name, profilePicture, otherInfo };

    try {
      // Update profile in Firebase
      await updateProfile(name, profilePicture);

      // Update profile in the database
      const response = await axiosPublic.put(
        `/profile/${user.email}`,
        profileData
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Profile updated successfully!",
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.error("There was an error updating the profile!", error);
      Swal.fire({
        title: "Error updating profile!",
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

  if (isLoading || loading) return <Spinner />;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Profile Page
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-200"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="profilePicture"
            className="block text-sm font-medium text-gray-200"
          >
            Profile Picture URL
          </label>
          <input
            id="profilePicture"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
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
            value={user.email}
            readOnly
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastLogin"
            className="block text-sm font-medium text-gray-200"
          >
            Last Login
          </label>
          <input
            id="lastLogin"
            type="text"
            value={user.metadata.lastSignInTime}
            readOnly
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
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
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
