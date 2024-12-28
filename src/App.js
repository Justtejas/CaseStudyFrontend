import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./routes/Router";
function App() {
  return (
    <div className="bg-gradient-to-b from-blue-900 via-blue-800 to-blue-600 h-screen flex items-center justify-center">
      <Router />
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
}

export default App;
