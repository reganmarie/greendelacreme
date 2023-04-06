import {  Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import ForumList from "./Forum.js";
import Signup from "./Signup.js";
import BlogList from "./BlogList.js";
import Nav from './NavigationBar.js';
import { useGetTokenQuery } from "./store/authApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { data } = useGetTokenQuery();

  return (
    <>
      {data ? (
        <>
        <Nav />
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path='/forum' element={<ForumList/> } />

        </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
      <ToastContainer />
    </>
  );

}



export default App;
