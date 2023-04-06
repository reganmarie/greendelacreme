import LoginForm from './LoginForm.js';
import BlogList from './BlogList.js';
import Nav from './NavigationBar.js';
import MainPage from './MainPage.js';
import Signup from './Signup.js';
import Protected from './utils/Protected.js';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useGetTokenQuery } from './store/authApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { data } = useGetTokenQuery();

  return (
    <>
      <Nav isLoggedIn={data} />
      <Routes>
        <Route element={<Protected token={data} />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/blogs" element={<BlogList />} />
        </Route>
        <Route path="/" element={data === null ? <LoginForm /> : <Navigate to="/blogs" replace />} />
        <Route path="/signup" element={data === null ? <Signup /> : <Navigate to="/blogs" replace />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
