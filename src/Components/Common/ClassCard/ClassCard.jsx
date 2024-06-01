import React from "react";

const ClassCard = ({ title, description, bookings }) => {
  return (
    <>
      <div className="border border-[#981840] p-6 text-center rounded-lg bg-[#1a1a1a] hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-xl font-bold text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <p className="text-gray-400 font-semibold">Bookings: {bookings}</p>
      </div>
    </>
  );
};

export default ClassCard;
