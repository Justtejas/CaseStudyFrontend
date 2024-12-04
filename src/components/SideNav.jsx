import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SideNav = () => {
    const { authUser } = useAuth();

    return (
        <div className="w-[20%] bg-gradient-to-b from-gray-900 via-slate-900 to-gray-800 text-white text-2xl p-6 flex flex-col">
            <h1 className="text-4xl font-bold text-gray-100 mb-6 flex items-center gap-2">
                <span>Dashboard</span>
            </h1>

            <nav className="flex flex-col gap-6">
                {authUser.role === "JobSeeker" && (
                    <NavLink
                        to="/joblistings"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-indigo-500 text-white"
                                : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                            }`
                        }
                    >
                        Browse Jobs
                    </NavLink>

                )}
                {authUser.role === "Employer" && (
                    <NavLink
                        to="/browseJobSeekers"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-indigo-500 text-white"
                                : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                            }`
                        }
                    >
                        Job Seekers
                    </NavLink>
                )}
                {authUser.role === "Employer" ? (
                    <NavLink
                        to="/employerProfile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-indigo-500 text-white"
                                : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                ) : (
                    <NavLink
                        to="/jobSeekerProfile"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-indigo-500 text-white"
                                : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                            }`
                        }
                    >
                        Profile
                    </NavLink>
                )}

                {authUser?.role === "Employer" && (
                    <NavLink
                        to="/postJob"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-indigo-500 text-white"
                                : "text-gray-300 hover:bg-indigo-700 hover:text-white"
                            }`
                        }
                    >
                        Post Jobs
                    </NavLink>
                )}
            </nav>
        </div>
    );
};

export default SideNav;

