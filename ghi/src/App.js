import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import Signup from "./Signup.js";
import BlogList from "./BlogList.js";
import { useGetTokenQuery } from "./store/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = useGetTokenQuery();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route
          path="/blogs"
          element={token ? <BlogList /> : navigate("/")}
        />
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
