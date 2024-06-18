import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import Spinner from "../../../Common/Loading/Spinner";

const ManageSlots = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [slotToDelete, setSlotToDelete] = useState(null);

  const fetchSlots = async () => {
    const response = await axiosPublic.get(`/trainer-slots/${user.email}`);
    return response.data;
  };

  const {
    data: slots,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["slots"],
    queryFn: fetchSlots,
  });

  const deleteSlot = async (slotId) => {
    const response = await axiosPublic.delete(`/delete-slot/${slotId}`);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: deleteSlot,
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      Swal.fire("Deleted!", "Slot has been deleted.", "success");
    },
  });

  const handleDelete = (slotId) => {
    setSlotToDelete(slotId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(slotId);
      }
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading slots</div>;

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#981840] mb-8">
        Manage Slots
      </h2>
      <div className="overflow-x-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-900 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">Day</th>
              <th className="py-2 px-4 border-b border-gray-700">Time</th>
              <th className="py-2 px-4 border-b border-gray-700">Booked By</th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td className="py-2 px-4 bg-gray-900 border-b border-gray-700">
                  <Select
                    className="bg-gray-900 text-white"
                    options={slot.availableDays.map((day) => ({
                      value: day,
                      label: day,
                    }))}
                    isDisabled
                    defaultValue={{
                      value: slot.availableDays,
                      label: slot.availableDays.join(", "),
                    }}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {slot.availableTime}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {slot.bookedBy ? slot.bookedBy.name : "Available"}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlots;
