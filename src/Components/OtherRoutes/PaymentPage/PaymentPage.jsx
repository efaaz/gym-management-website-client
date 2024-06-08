import React, { useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { trainer, slot, packageName } = useParams();
  const location = useLocation();
  const { price, userName, userEmail } = location.state; // Assuming these details are passed via state

  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleConfirm = async () => {
    const paymentInfo = {
      trainer,
      slot,
      packageName,
      price,
      userName,
      userEmail,
      additionalInfo,
    };

    try {
      const response = await axios.post("https://gym-management-livid.vercel.app/payment", paymentInfo);
      if (response.status === 200) {
        Swal.fire({
          title: "Booked Trainer Successfully!",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/")
      }
    } catch (error) {
      console.error("There was an error confirming the payment!", error);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 text-gray-200">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-[#981840] mb-4 text-center">Payment Details</h2>
        <div className="mb-4">
          <p className="text-gray-400">Trainer Name: <span className="text-gray-200">{trainer}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-400">Slot Name: <span className="text-gray-200">{slot}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-400">Package Name: <span className="text-gray-200">{packageName}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-400">Price: <span className="text-gray-200">{price}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-400">Your Name: <span className="text-gray-200">{userName}</span></p>
        </div>
        <div className="mb-4">
          <p className="text-gray-400">Your Email: <span className="text-gray-200">{userEmail}</span></p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="additionalInfo">Additional Info</label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-200"
            rows="4"
          />
        </div>
        <button
          onClick={handleConfirm}
          className="bg-[#981840] text-white py-2 px-6 rounded-lg hover:bg-[#790f32] transition duration-300 w-full text-center"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
