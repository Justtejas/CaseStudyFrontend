import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();
  const API_URL = "https://localhost:7064/api/Auth";

  const logout = async function () {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.removeItem("authUser");
      setAuthUser(null);
    } catch (err) {
      toast.error(err.message, { duration: 1500 });
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
