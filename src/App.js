import Router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Router />

      <ToastContainer autoClose={4000} />
    </BrowserRouter>
  );
}

export default App;
