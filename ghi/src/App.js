import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import BlogList from "./BlogList.js";
import { useGetTokenQuery } from "./store/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { data } = useGetTokenQuery();

  return (
    <>
      {data ? (
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<Form />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
