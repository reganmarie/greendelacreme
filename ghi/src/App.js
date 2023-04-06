import { Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "./LoginForm.js";
import Signup from "./Signup.js";
import BlogList from "./BlogList.js";
import { useGetTokenQuery } from "./store/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   const {data} = useGetTokenQuery();

   console.log(data)

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/blogs"
          element={  data ? <BlogList/> :  <Navigate to="/" replace /> }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
