import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

const API_URL = "https://localhost:7064/api/Auth";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const login = async (username, password) => {
    const success = handleFormErrors(username, password);
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/employer/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const data = response.data;
      console.log(data);
      if (!data) throw new Error("No data received from the server");

      localStorage.setItem("authUser", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleFormErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
