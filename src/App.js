import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { authUser } = useAuth();
  return (
    <div className=" bg-sky-300 bg-opacity-90 h-screen p-4 flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route path="*" Component={() => <Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
