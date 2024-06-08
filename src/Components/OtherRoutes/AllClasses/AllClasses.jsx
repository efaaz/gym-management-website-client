import React, { useState } from "react";
import Spinner from "../../Common/Loading/Spinner";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Common/SectionTitle/SectionTitle";
import ClassCard from "../ClassCard/ClassCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

function AllClasses() {
  const axiosPublic = useAxiosPublic();
  // State for pagination
  const [page, setPage] = useState(1);
  const limit = 6; // Posts per page

  const fetchClasses = async (page) => {
    const response = await axiosPublic.get(
      `/classes?page=${page}&limit=${limit}`
    ); // Replace with your API endpoint
    return response.data;
  };
  const {
    data: classes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["classes", page], // Include page in the query key
    queryFn: () => fetchClasses(page), // Update the query function
    staleTime: 60000, // Optional: Set stale time for cache
  });
  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading trainers</div>;
  return (
    <>
      <div className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Classes" />
          <div className="grid grid-cols-1 gap-2 mt-2">
            {classes.data.map((trainer) => (
              <ClassCard
                key={trainer.id}
                title={trainer.title}
                description={trainer.description}
                trainers={trainer.trainers}
                coverImg={trainer.coverImg}
              />
            ))}
          </div>
        </div>
      </div>
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
          disabled={!classes.pagination.hasMore}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default AllClasses;
