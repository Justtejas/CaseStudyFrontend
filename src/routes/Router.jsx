import Home from "../components/Home"
import Login from "../components/Login"
import About from "../components/About"
import JobListing from "../components/JobListing"
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import RegisterEmployer from "../components/RegisterEmployer";
import RegisterJobSeeker from "../components/RegisterJobSeeker";
import AddJobListing from "../components/AddJobListing";
import AddResume from "../components/AddResume";

export const Router = () => {
    const { authUser } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={authUser ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route
                path="/login"
                element={authUser ? <Navigate to={"/"} /> : <Login />}
            />
            <Route
                path="/joblisting"
                element={authUser ? <JobListing /> : <Navigate to={"/login"} />}
            />
            <Route path="/About" element={<About />} />
            <Route path="/registerEmployer" element={<RegisterEmployer />} />
            <Route path="/registerJobSeeker" element={<RegisterJobSeeker />} />
            <Route path="/addJobListing" element={<AddJobListing />} />
            <Route path="/addResume" element={<AddResume />} />
            <Route path="*" Component={() => <Navigate to="/" />} />
        </Routes>
    )
}
