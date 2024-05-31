import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FaSquarespace } from "react-icons/fa6";
import DotSpinner from "../Loading/DotSpinner";
import { AuthContext } from "../../../Contexts/AuthProvider";

function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  let img;
  let li = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `mx-2 text-lg font-medium ${
              isActive
                ? " text-[#981840] font-bold"
                : "text-gray-400 font-normal"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-trainer"
          className={({ isActive }) =>
            `mx-2 text-lg  ${
              isActive
                ? " text-[#981840] font-bold"
                : "text-gray-400 font-normal"
            }`
          }
        >
          All Trainer
        </NavLink>
      </li>
      <div className="dropdown dropdown-hover">
        <div
          tabIndex={0}
          role="button"
          className={`shadow-lg px-4 py-1 border-x text-lg m-1 border-b-4 border-[#981840] rounded-3xl font-semibold ${
            true ? "block" : "hidden"
          } `}
        >
          Dashboard
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NavLink
              to="/manage-service"
              className={({ isActive }) =>
                `${isActive ? "border border-green-500 font-semibold" : ""} `
              }
            >
              Manage Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booked-services"
              className={({ isActive }) =>
                `${isActive ? "border border-green-500 font-semibold" : ""} `
              }
            >
              Booked Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/service-to-do"
              className={({ isActive }) =>
                `${isActive ? "border border-green-500 font-semibold" : ""} `
              }
            >
              Service To Do
            </NavLink>
          </li>
        </ul>
      </div>
      <li>
        <NavLink
          to="/all-classes"
          className={({ isActive }) =>
            `mx-2 text-lg ${
              isActive ? " text-[#981840] font-bold" : "text-gray-400"
            }`
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `mx-2 text-lg ${
              isActive ? "text-[#981840] font-semibold" : "text-gray-400"
            }`
          }
        >
          Community
        </NavLink>
      </li>
    </>
  );
  if (user && user.photoURL) {
    img = user.photoURL;
  }
  return (
    <div className="container  mx-auto relative z-10">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {li}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost lg:text-3xl text-xl font-bold">
            Aura Fitness
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 flex items-center">{li}</ul>
        </div>
        <div className="navbar-end items-center">
          {/* <input type="checkbox" className="toggle lg:mr-2 sm:mr-0" onChange={handleToggle} /> */}
          {loading ? (
            // Display a loading spinner
            <div className="flex items-center justify-center">
              <div className="loader mr-4">
                <DotSpinner></DotSpinner>
              </div>
            </div>
          ) : (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar md:mr-2 mr-0"
              >
                {user && (
                  <div className="w-10 rounded-full">
                    <div
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user.displayName}
                      data-tooltip-place="left"
                    >
                      <img
                        alt="user img"
                        src={user.photoURL}
                        className="rounded-full"
                      />
                      <Tooltip id="my-tooltip" />
                    </div>
                  </div>
                )}
              </div>
              {user ? (
                <button
                  onClick={logOut}
                  className="btn border border-[#981840]"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/Sign-in" className="btn border border-[#981840]">
                    Log in
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
