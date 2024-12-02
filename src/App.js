import { useLocation } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./routes/Router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login"; // Adjust this path based on your routing

  return (
    <div className="bg-sky-300 bg-opacity-85 h-screen">
      {/* Only render Header and Footer if it's not the login page */}
      {!isLoginPage && <Header />}

      <main className="flex-grow overflow-auto">
        <Router />
      </main>

      {/* Only render Footer if it's not the login page */}
      {!isLoginPage && <Footer />}

      <ToastContainer />
    </div>
  );
}

export default App;
