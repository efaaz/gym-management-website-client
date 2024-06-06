import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Dashboard = () => {
    const [userRole] = useUserRole();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        userRole === 'admin' && <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList />
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaBook />
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>
                        </>
                    }
                    {
                        userRole === 'trainer' && <>
                            <li>
                                <NavLink to="/dashboard/trainerHome">
                                    <FaHome />
                                    Trainer Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageSchedule">
                                    <FaCalendar />
                                    Manage Schedule
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/clients">
                                    <FaUsers />
                                    My Clients
                                </NavLink>
                            </li>
                        </>
                    }
                    {
                        userRole === 'member' && <>
                            <li>
                                <NavLink to="/dashboard/userHome">
                                    <FaHome />
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/reservation">
                                    <FaCalendar />
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/review">
                                    <FaAd />
                                    Add a Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaList />
                                    My Bookings
                                </NavLink>
                            </li>
                        </>
                    }
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
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
