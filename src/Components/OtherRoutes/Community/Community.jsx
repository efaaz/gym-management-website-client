import { useState } from "react"; // Import useState hook
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import CommunityCard from "../CommunityCard/CommunityCard";
import Spinner from "../../Common/Loading/Spinner";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

function Community() {
  const axiosPublic = useAxiosPublic();
  // State for pagination
  const [page, setPage] = useState(1);
  const limit = 6; // Posts per page

  const fetchCommunityPosts = async (page) => {
    const response = await axiosPublic.get(`/forum?page=${page}&limit=${limit}`);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["communityPosts", page], // Include page in the query key
    queryFn: () => fetchCommunityPosts(page), // Update the query function
    staleTime: 60000, // Optional: Set stale time for cache
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto py-12">
      <SectionTitle title="Latest Community Posts" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data.posts.map((post) => (
          <CommunityCard
            key={post.id}
            title={post.title}
            excerpt={post.description}
            link={post.link}
            postId={post._id}
            upVotes={post.upVotes}
            downVotes={post.downVotes}
            badge={post.badge}
          />
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={!data.pagination.hasMore}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Community;
