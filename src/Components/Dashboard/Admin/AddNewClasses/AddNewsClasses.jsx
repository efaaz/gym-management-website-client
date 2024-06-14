import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddNewClass = () => {
  const axiosPublic = useAxiosPublic();
  const [className, setClassName] = useState("");
  const [image, setImage] = useState(""); // Image URL
  const [details, setDetails] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: className,
      coverImg: image, // Image URL
      description: details,
      trainers: additionalInfo,
    };

    try {
      const response = await axiosPublic.post("/add-class", formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Class added successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    } catch (error) {
      console.error("There was an error adding the class!", error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Add New Class
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-lg space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="className"
            className="block text-sm font-medium text-gray-200"
          >
            Class Name
          </label>
          <input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-200"
          >
            Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-200"
          >
            Details
          </label>
          <textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-200"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewClass;
