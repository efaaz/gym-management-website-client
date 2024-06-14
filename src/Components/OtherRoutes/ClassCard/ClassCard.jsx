import React from "react";
import { Link } from "react-router-dom";

const ClassCard = ({ title, description, trainers, coverImg }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-[#981840] bg-[#1a1a1a]">
        <div className="w-full md:w-1/3  grid place-items-center">
          <img src={coverImg} alt="trainer" className="rounded-xl" />
        </div>
        <div className="w-full md:w-2/3 flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center"></div>
          <h3 className="font-black text-gray-200 md:text-3xl text-xl">
            {title}
          </h3>
          <p className="md:text-lg text-gray-300 text-base">{description}</p>
          <h3 className="font-bold text-xl">Trainers who took this class:</h3>
          <div className="avatar">
            {trainers.map((photo, idx) => (
              <div key={idx} className="w-12 rounded-full my-2 ml-2">
                <Link
                  to={`/serch-by-photo/${encodeURIComponent(photo)}`} // Pass photo link in the route path
                >
                  <img src={photo} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
