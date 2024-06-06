import React from "react";

const TrainerCard = ({ name, bio, expertise, photo }) => {
  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-gray-200">
      <img src={photo} alt={name} className="h-48 w-48 object-cover rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-400 mb-2">{bio}</p>
      <p className="text-[#981841] font-semibold">Expertise: {expertise}</p>
    </div>
  );
};

export default TrainerCard;
