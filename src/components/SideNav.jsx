import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const SideNav = () => {
    const { authUser } = useAuth();

    return (
        <div className="w-[20%] h-full bg-gray-100 p-6 shadow-lg">
            {/* Dashboard Title */}
            <h1 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                <i className="ri-profile-line text-indigo-500"></i>
                <span>Dashboard</span>
            </h1>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4">
                <NavLink
                    to="/BrowseJobs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                        }`
                    }
                >
                    <i className="ri-building-4-fill"></i> Browse Jobs
                </NavLink>

                <NavLink
                    to="/browseJobSeekers"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                        }`
                    }
                >
                    <i className="ri-id-card-line"></i> Job Seekers
                </NavLink>

                <NavLink
                    to="/Profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                        }`
                    }
                >
                    <i className="ri-empathize-fill"></i> Profile
                </NavLink>

                {authUser?.role === "EMPLOYER" && (
                    <NavLink
                        to="/PostJob"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                            }`
                        }
                    >
                        <i className="ri-signpost-fill"></i> Post Jobs
                    </NavLink>
                )}


                <NavLink
                    to="/registerEmployer"
                    className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-indigo-500 text-white" : "text-gray-600 hover:bg-indigo-100 hover:text-indigo-600"
                        }`
                    }
                >
                    <i className="ri-flag-2-fill"></i> Register as Employer
                </NavLink>
            </nav>
        </div>
    );
};

