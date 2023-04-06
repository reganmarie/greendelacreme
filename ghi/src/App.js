import LoginForm from './LoginForm.js';
import BlogList from './BlogList.js';
import ForumList from './Forum.js';
import Nav from './NavigationBar.js';
import MainPage from './MainPage.js';
import Signup from './Signup.js';
import Protected from './utils/Protected.js';
import { Routes, Route } from 'react-router-dom';
import { useGetTokenQuery } from './store/authApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { data } = useGetTokenQuery();

  if (data === undefined) {
    return null;
  }

  return (
    <>
      <Nav isLoggedIn={data} />
      <Routes>
        <Route element={<Protected token={data} />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/forum" element={<ForumList />} />
        </Route>
        <Route path="/" element={<LoginForm token={data} />} />
        <Route path="/signup" element={<Signup token={data} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
