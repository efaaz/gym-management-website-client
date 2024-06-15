import React from "react";
import { useQuery } from "@tanstack/react-query";
import CommunityPostCard from "../CommunityPostCard/CommunityPostCard";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const LatestCommunityPosts = () => {
  const axiosPublic = useAxiosPublic();
  const fetchCommunityPosts = async () => {
    const response = await axiosPublic.get("/latest/forum");
    return response.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["communityPosts"],
    queryFn: fetchCommunityPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto py-12">
      <SectionTitle title="Latest Community Posts" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {data.map((post) => (
          <CommunityPostCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            link={post.link}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCommunityPosts;
