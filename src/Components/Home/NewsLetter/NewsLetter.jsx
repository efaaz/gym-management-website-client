import React from "react";
import { useForm } from "react-hook-form";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const NewsLetter = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic
        .post("/subscribe", data)
        .then((response) => {
          //   console.log(response);
          if (response.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Subscribed NewsLetter successfully.",
              showConfirmButton: false,
              timer: 2000,
            });
            reset(); // Clear input fields after successful subscription
          }
        });
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <>
      <SectionTitle title="NewsLetter Section"></SectionTitle>
      <section className="flex items-center justify-center">
        <div className=" p-8 pt-0 max-w-md w-full rounded-lg text-center">
          <section className="text-gray-400 text-lg mb-6">
            <p>Subscribe to our newsletter for the latest updates.</p>
          </section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Your Name"
              className="bg-[#310815] px-4 py-2 rounded-full w-full md:w-64 mb-4 focus:outline-none"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="bg-[#310815] px-4 py-2 rounded-full w-full md:w-64 mb-4 focus:outline-none"
              {...register("email")}
            />
            <button
              type="submit"
              className="bg-[#981840] text-white px-6 py-2 rounded-full focus:outline-none"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
