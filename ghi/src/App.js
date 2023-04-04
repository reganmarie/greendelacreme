import { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import BlogList from './BlogList.js';

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);


  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='new' element={<Construct info={launch_info} />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='blogs' element={<BlogList />} />
      </Routes>
      <ErrorNotification error={error} />
    </div>
    </BrowserRouter>
  );
}

export default App;
