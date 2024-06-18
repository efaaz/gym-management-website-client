import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserRole from "../../../../hooks/useUserRole";

function AddNewForumTrainer() {
  const axiosSecure = useAxiosSecure();
  const [userRole] = useUserRole();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      userRole,
    };

    try {
      const response = await axiosSecure.post("/add-forum", formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Forum added successfully!",
          icon: "success",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("There was an error adding the forum!", error);
      Swal.fire({
        title: "Error adding forum!",
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
    <>
      {" "}
      <div className="container mx-auto py-12 px-4 text-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
          Add New Forum
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-200"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-200"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300"
            >
              Add Forum
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddNewForumTrainer;
