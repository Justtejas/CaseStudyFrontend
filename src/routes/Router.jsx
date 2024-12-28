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
import JobSeekerProfile from "../components/JobSeekerProfile";
import EmployerProfile from "../components/EmployerProfile";
import ApplicationList from "../components/ApplicationList";
import EmployerJobListings from "../components/EmployerJobListings";
import JobSeekersList from "../components/JobSeekerList";

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
                path="/joblistings"
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
                path="/employerJobListings"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <EmployerJobListings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/jobseekerlist"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <JobSeekersList />
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
                    <About />
                }
            />
            <Route
                path="/login"
                element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
                path="/jobSeekerProfile"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <JobSeekerProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employerProfile"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <EmployerProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/myapplications"
                element={
                    <ProtectedRoute authUser={authUser}>
                        <ApplicationList />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
