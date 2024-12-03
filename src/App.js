import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./routes/Router";
function App() {
  return (
    <div className=" bg-sky-300 bg-opacity-90 h-screen flex items-center justify-center">
      <Router />
      <ToastContainer />
    </div>
  );
}

export default App;
