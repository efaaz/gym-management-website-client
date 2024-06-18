import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Spinner from "../../../Common/Loading/Spinner";
import avatar from "../../../../assets/Avatar/avatar.png";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

function AllTrainers() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const fetchAllTrainers = async (page) => {
    const response = await axiosSecure.get(`/trainer`); // Replace with your API endpoint
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: fetchAllTrainers,
  });

  let updateRole = async (email) => {
    let userInfo = { email: email };
    const response = await axiosPublic.patch(`/updaterole`, userInfo);
    console.log(response.status);
    if (response.status === 200) {
      Swal.fire({
        title: "Trainer Deleted!",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      refetch();
    }
  };

  if (isLoading) return <Spinner></Spinner>;
  if (error) return <div>Error loading trainers</div>;
  return (
    <>
      <h1 className="text-center md:text-3xl text-xl">All Trainers</h1>
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Trainer info</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={avatar} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <th>{user.role}</th>
                <th>
                  <button
                    onClick={() => updateRole(user.email)}
                    className="btn btn-warning"
                  >
                    Delete
                  </button>
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

export default AllTrainers;
