import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainerCard = ({
  name,
  photo,
  experience,
  social,
  availableSlots,
  bio,
  expertise,
}) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-gray-200 transition-transform transform hover:scale-105">
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="h-48 w-48 object-cover rounded-full mx-auto mb-4"
        />
        <span className="absolute top-0 right-0 bg-[#981840] text-white text-xs font-bold py-1 px-2 rounded-lg">
          {experience} years+
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2 text-center text-[#981840]">
        {name}
      </h3>
      <p className="text-center text-gray-400 mb-2">{bio}</p>
      <div className="flex items-center justify-center text-gray-500 mb-2">
        <FaStar className="mr-2" />
        <p className="font-semibold">Expertise: {expertise}</p>
      </div>
      <div className="flex items-center justify-center text-gray-500 mb-4">
        <FaClock className="mr-2" />
        <p className="font-semibold">Available Slots: {availableSlots}</p>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        <a
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 hover:text-teal-400"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href={social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 hover:text-teal-400"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 hover:text-teal-400"
        >
          <FaInstagram size={24} />
        </a>
      </div>
      <div className="text-center pt-4" >
        <Link
          to={`/trainers/${name}`}
          className="bg-[#981840] text-white py-2 px-4 rounded-lg hover:bg-[#790f32] transition duration-300"
        >
          Know More
        </Link>
      </div>
    </div>
  );
};

export default TrainerCard;
