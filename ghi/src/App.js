import LoginForm from './LoginForm.js';
import BlogList from './blogs/components/BlogList.js';
import ForumList from './forums/Forum.js';
import Nav from './NavigationBar.js';
import MainPage from './MainPage.js';
import About from './About.js';
import Signup from './Signup.js';
import Protected from './utils/Protected.js';
import ForumDetail from './forums/ForumDetail.js';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useGetTokenQuery } from './store/authApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './PageNotFound.js';
import Perenual from './PerenualApi/Perenual.js';
import PlantResources from './resources/PlantResources.js';
import ScrollToTop from './utils/ScrollToTop.js';
import EditForm from './accounts/EditForm.js';


export default function App() {
  const { data } = useGetTokenQuery();

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  if (data === undefined) {
    return null;
  }

  return (
    <BrowserRouter basename={basename}>
      <ScrollToTop />
      <Nav isLoggedIn={data} />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route element={<Protected token={data} />}>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/forum" element={<ForumList />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="/resources" element={<PlantResources/>} />
          <Route path="/data" element={<Perenual/>} />
          <Route path="/accounts">
            <Route path="edit" element={<EditForm user={data} />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginForm token={data} />} />
        <Route path="/signup" element={<Signup token={data} />} />
        <Route path="/" element={<MainPage token={data} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}
