import React, { useContext, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { AuthContext } from "../../../Contexts/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

function CommunityCard({
  title,
  excerpt,
  postId,
  upVotes: initialUpVotes,
  downVotes: initialDownVotes,
  badge,
}) {
  const initialUpVotesValue = isNaN(initialUpVotes)
    ? 0
    : Number(initialUpVotes);
  const initialDownVotesValue = isNaN(initialDownVotes)
    ? 0
    : Number(initialDownVotes);
  const [upVotes, setUpVotes] = useState(initialUpVotesValue);
  const [downVotes, setDownVotes] = useState(initialDownVotesValue);
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const handleUpVote = async () => {
    if (!user) {
      Swal.fire({
        title: "Access denied",
        text: "Please log in to vote!",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    try {
      const response = await axiosPublic.patch(`/posts/${postId}/upvote`);
      setUpVotes((prevUpVotes) => prevUpVotes + 1);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownVote = async () => {
    if (!user) {
      Swal.fire({
        title: "Access denied",
        text: "Please log in to vote!",
        icon: "error",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }

    try {
      const response = await axiosPublic.patch(`/posts/${postId}/downvote`);
      setDownVotes((prevDownVotes) => prevDownVotes + 1);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  return (
    <div className="max-w-sm p-6 bg-[#1a1a1a] rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={handleUpVote} className="mr-2">
            <LuArrowBigUp className="text-green-500 text-2xl" />
          </button>
          <span className="text-green-500 text-xl">{upVotes}</span>
          <button onClick={handleDownVote} className="ml-2">
            <LuArrowBigDown className="text-red-600 text-2xl" />
          </button>
          <span className="text-red-600 text-xl">{downVotes}</span>
        </div>
        <p className="text-green-500 rounded-lg px-2 py-1 font-bold border border-[#981840]">
          {badge}
        </p>
      </div>
    </div>
  );
}

export default CommunityCard;
