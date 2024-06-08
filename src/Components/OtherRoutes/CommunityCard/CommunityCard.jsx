import React, { useContext, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import axios from "axios";
import { AuthContext } from "../../../Contexts/AuthProvider";

function CommunityCard({
  title,
  excerpt,
  postId,
  upVotes: initialUpVotes,
  downVotes: initialDownVotes,
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

  const handleUpVote = async () => {
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://gym-management-livid.vercel.app/posts/${postId}/upvote`
      );
      setUpVotes((prevUpVotes) => prevUpVotes + 1);
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownVote = async () => {
    if (!user) {
      alert("Please log in to vote.");
      return;
    }

    try {
      const response = await axios.patch(
        `https://gym-management-livid.vercel.app/posts/${postId}/downvote`
      );
      setDownVotes((prevDownVotes) => prevDownVotes + 1);
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  return (
    <div className="max-w-sm p-6 bg-[#1a1a1a] rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{excerpt}</p>
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
    </div>
  );
}

export default CommunityCard;
