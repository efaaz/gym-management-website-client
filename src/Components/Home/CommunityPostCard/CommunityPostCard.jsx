import React from "react";
import { Link } from "react-router-dom";

const CommunityPostCard = ({ title, excerpt, link }) => {
  return (
    <div className="max-w-sm p-6 bg-[#1a1a1a] rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{excerpt}</p>
      <Link
        to="/community"
        className="inline-block text-teal-500 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read More →
      </Link>
    </div>
  );
};

export default CommunityPostCard;
