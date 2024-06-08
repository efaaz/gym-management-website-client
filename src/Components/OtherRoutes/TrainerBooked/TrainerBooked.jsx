import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const TrainerBooked = () => {
  const { trainer, slot } = useParams();
  const { user } = useAuth();

  const packages = [
    {
      name: "Basic Membership",
      benefits: [
        "Access to gym facilities during regular operating hours",
        "Use of cardio and strength training equipment",
        "Access to locker rooms and showers",
      ],
      price: "$10",
    },
    {
      name: "Standard Membership",
      benefits: [
        "All benefits of the Basic Membership",
        "Access to group fitness classes such as yoga, spinning, and Zumba",
        "Use of additional amenities like a sauna or steam room",
      ],
      price: "$50",
    },
    {
      name: "Premium Membership",
      benefits: [
        "All benefits of the Standard Membership",
        "Access to personal training sessions with certified trainers",
        "Discounts on additional services such as massage therapy or nutrition counseling",
      ],
      price: "$100",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#981840]">
          Book a Session with {trainer}
        </h2>
        <p className="text-gray-400 mt-4">Selected Slot: {slot}</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-center items-center lg:p-8 p-4 font-sans bg-gray-900 min-h-screen">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`lg:w-[23rem] bg-gray-800 w-full border-2 border-gray-700 p-5 shadow-lg ml-2 ${
              index === 0
                ? "lg:rounded-r-none"
                : index === packages.length - 1
                ? "lg:rounded-l-none"
                : ""
            } lg:my-0 my-4`}
          >
            <div className="pb-3 mb-4 border-b border-gray-700">
              <div className="text-xs text-gray-300 mb-2">
                {pkg.name.toUpperCase()}
              </div>
              <div className="flex items-center">
                <h2 className="text-5xl m-0 font-normal text-[#981840]">
                  {pkg.price}
                </h2>
                {pkg.price !== "Free" && (
                  <span className="text-gray-500 ml-1">/mo</span>
                )}
              </div>
            </div>
            <ul className="mb-4">
              {pkg.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center text-gray-400 mb-2">
                  <FaCheckCircle className="text-teal-500 mr-1" /> {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-auto w-full">
              <Link
                to={`/payment/${trainer}/${slot}/${pkg.name}`}
                state={{
                  price: pkg.price,
                  userName: user.displayName,
                  userEmail: user.email,
                }} // replace with actual user data
                className={`bg-[#981840] text-white py-2 border-none w-full flex items-center px-3 rounded-xl hover:bg-[#790f32] transition duration-300`}
              >
                Join Now
                <svg
                  className="ml-auto"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19 12H4.75"
                  ></path>
                </svg>
              </Link>
              <div className="text-xs mt-3 text-gray-500 line-height-2">
                Literally you probably haven't heard of them jean shorts.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerBooked;
