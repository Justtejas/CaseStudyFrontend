import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import api from "../services/api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const login = async (username, password, role) => {
    const success = handleFormErrors(username, password);
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const loginEndpoint =
        role === "employer" ? "/Auth/employer/login" : "/Auth/jobseeker/login";
      const response = await api.post(
        loginEndpoint,
        {
          username,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;
      console.log(data);
      if (!data) throw new Error("No data received from the server");

      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      setAuthUser(data.user);
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
