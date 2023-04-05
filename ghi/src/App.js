import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import BlogList from './BlogList.js';
import { useGetTokenQuery } from './store/authApi';
import { setUser } from './store/user';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { data } = useGetTokenQuery();

  return (
    <>
      <Routes>
      { data ?
        <Route path='/blogs' element={<BlogList />} />
      :
        <Route path='/' element={<LoginForm />} />
      }
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
