import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Swal from "sweetalert2";

function Login() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, googleSignin, setLoading } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const login = (data) => {
    setError("");
    signIn(data.Email, data.Password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate("/");
      })

      .catch((error) => {
        setError(error.message);
        toast("Invalid user credential");
      });
  };

  const handleGoogleSignin = (event) => {
    setError("");
    googleSignin()
      .then((userCredential) => {
        // console.log(userCredential);
        const email = userCredential.user?.email;
        const lastLoggedAt = userCredential.user?.metadata?.lastSignInTime;
        const creationTime = userCredential.user?.metadata?.creationTime;
        const userInfo = {
          email: email,
          creationTime: creationTime,
          lastLoggedAt: lastLoggedAt,
        };
        // console.log(userInfo);
        axios
          .put("https://service-site-five.vercel.app/api/user", userInfo)
          .then((data) => {
            // console.log(data);
            navigate(location?.state?.from?.pathname || "/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        setError(error.message);
        toast("Invalid user credential");
      });
  };
  return (
    <>
      <div className="container flex flex-col mx-auto my-2">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10 rounded-lg shadow border-[#981840] border border-rou">
              <form
                className="flex flex-col w-full h-full pb-6 text-center rounded-3xl"
                onSubmit={handleSubmit(login)}
              >
                <h3 className="mb-3 text-4xl font-extrabold text-white">
                  Sign In
                </h3>
                <p className="mb-4 text-gray-300">
                  Enter your email and password
                </p>
                <button
                  onClick={handleGoogleSignin}
                  className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300"
                >
                  <img
                    className="h-5 mr-2"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                    alt=""
                  />
                  Sign in with Google
                </button>
                <div className="flex items-center mb-3">
                  <hr className="h-0 border-b border-solid border-gray-500 grow" />
                  <p className="mx-4 text-gray-300">or</p>
                  <hr className="h-0 border-b border-solid border-gray-500 grow" />
                </div>
                <label
                  htmlFor="email"
                  className="mb-2 text-sm text-start text-white"
                >
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-700 mb-7 placeholder:text-gray-400 bg-gray-600 text-white rounded-2xl"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.Email && (
                  <p className="text-red-500">Email is required</p>
                )}
                <label
                  htmlFor="password"
                  className="mb-2 text-sm text-start text-white"
                >
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-gray-700 placeholder:text-gray-400 bg-gray-600 text-white rounded-2xl"
                  {...register("Password", { required: true })}
                />
                {errors.Password && (
                  <p className="text-red-500">Password is required</p>
                )}
                <div className="flex flex-row justify-between mb-8">
                  <label className="relative inline-flex items-center mr-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 bg-white border-2 rounded-sm border-gray-500 peer peer-checked:border-0 peer-checked:bg-[#981840]">
                      <img
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                      />
                    </div>
                    <span className="ml-3 text-sm font-normal text-white">
                      Keep me logged in
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="mr-4 text-sm font-medium text-[#981840]"
                  >
                    Forget password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-600 focus:ring-4 focus:ring-purple-100 bg-[#981840]"
                >
                  Sign In
                </button>
                <p className="text-lg leading-relaxed text-white">
                  Not registered yet?{" "}
                  <Link
                    to="/sign-up"
                    className="font-bold text-[#981840] underline"
                  >
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
