import React from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Spinner from "../../../Common/Loading/Spinner";
import avatar from "../../../../assets/Avatar/avatar.png"
import { useQuery } from "@tanstack/react-query";

function Subscribers() {
  const axiosPublic = useAxiosPublic();
  const fetchSubcribers = async (page) => {
    const response = await axiosPublic.get(`/subscribers`); // Replace with your API endpoint
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: fetchSubcribers,
  });

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading trainers</div>;
  return (
    <>
      <Helmet>
        <title>ServiceSphere | To Do</title>
      </Helmet>
      <h1 className="text-center md:text-3xl text-xl">Newsletter Subscribers Information</h1>
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Client info</th>
              {/* <th>Service taking Date</th> */}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((user,idx) => (
              <tr key={user._id}>
                <td>{idx+1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={avatar}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                 Subscribed
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Subscribers;
