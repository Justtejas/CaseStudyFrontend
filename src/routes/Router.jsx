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
import ProtectedRoute from "../components/ProtectedRoute";

export const Router = () => {
    const { authUser } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home />
                }
            />
            <Route
                path="/joblisting"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <JobListing />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/addJobListing"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <AddJobListing />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/addResume"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <AddResume />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/registerEmployer"
                element={
                    <RegisterEmployer />
                }
            />
            <Route
                path="/registerJobSeeker"
                element={
                    <RegisterJobSeeker />
                }
            />
            <Route
                path="/about"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <About />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/login"
                element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
