import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-200 border-b-4 border-[#981840] inline-block pb-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
