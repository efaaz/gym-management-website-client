import {
  FaBook,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaUsers,
  FaRegPlusSquare,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RxActivityLog } from "react-icons/rx";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscGitStashApply } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
  const [userRole] = useUserRole();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-[#981840]">
        <ul className="menu p-4">
          {userRole === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-trainers">
                  <FaUsers />
                  All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/applied-trainers">
                  <VscGitStashApply />
                  Applied Trainer
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/newsletter-subscribers">
                  <IoNewspaperOutline />
                  All Newsletter subscribers
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-classes">
                  <FaRegPlusSquare />
                  Add New Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-form">
                  <FaRegPlusSquare />
                  Add New Forum
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/balance">
                  <MdOutlineAccountBalanceWallet />
                  Balance
                </NavLink>
              </li>
            </>
          )}
          {userRole === "trainer" && (
            <>
              {/* <li>
                <NavLink to="/dashboard/trainerHome">
                  <FaHome />
                  Trainer Home
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/dashboard/manage-slots">
                  <FaBook />
                  Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-slot">
                  <FaRegPlusSquare />
                  Add New Slot
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-new-form-trainer">
                  <FaRegPlusSquare />
                  Add New Forum
                </NavLink>
              </li>
            </>
          )}
          {userRole === "member" && (
            <>
              {/* <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/dashboard/activity-log">
                  <RxActivityLog />
                  Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">
                  <CgProfile />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/booked-trainer">
                  <FaList />
                  Booked Trainer
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8 bg-[#170909]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
