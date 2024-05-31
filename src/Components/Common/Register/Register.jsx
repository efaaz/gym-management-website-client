
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Contexts/AuthProvider";

function Register() {
  const { signUp, updateProfile, logOut, user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one digit, one lowercase letter, and one uppercase letter."
      );
      return false;
    }
    return true;
  }

  const logUp = (data) => {
    setError("");
    const password = data.Password;

    if (!validatePassword(password)) {
      return;
    }

    // Use then-catch approach for promise handling
    signUp(data.Email, data.Password)
      .then((userCredential) => {
        const createdAt = userCredential.user?.metadata?.creationTime;
        const email = userCredential.user?.email;
        const userInfo = { email, createdAt: createdAt };
        axios
          .post("https://service-site-five.vercel.app/api/user", userInfo)
          .then((data) => {
            // console.log(data);
            if (data.insertedId) {
              //   console.log("user added to the database");
            }
          });
        // Update profile after successful signup
        return updateProfile(data.Name, data.PhotoURL).then(() => {
          // Optional: Logging out after profile update
          logOut();
        });
      })
      .then(() => {
        toast("Sign-up successful");
      })
      .catch((err) => {
        setError(err.message);
      });

    // Note that `user` may be undefined due to asynchronous nature
  };
  return (
    <>
      <Helmet>
        <title>ServiceSphere | Register</title>
      </Helmet>
      <ToastContainer />
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(logUp)}
              >
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    {...register("Name", { required: true })}
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                  />
                  {errors.Name && (
                    <p className="text-red-500">Name is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    {...register("Email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {errors.Email && (
                    <p className="text-red-500">Valid email is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="PhotoURL"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Photo URL
                  </label>
                  <input
                    type="text"
                    {...register("PhotoURL")}
                    id="PhotoURL"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="http://"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="Password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    {...register("Password", { required: true })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.Password && (
                    <p className="text-red-500">Password is required</p>
                  )}
                  <div
                    className="flex items-center h-5 absolute top-10 right-2"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-red-500">{error}</p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/Sign-in"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
