import { useLogoutUserMutation } from './store/authApi';
import { useNavigate } from 'react-router-dom';


function Nav({ isLoggedIn }) {
  const navigate = useNavigate();
  const [logout] = useLogoutUserMutation();

  async function handleClick(e) {
    e.preventDefault();
    await logout().then(() => {
      navigate("/");
    });
  }

  return (
    <nav className="bg-blue-400">
      {isLoggedIn &&
        <ul>
          <li>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="logout" type="submit" onClick={handleClick}> Logout </button>
          </li>
        </ul>
      }
    </nav>
  );
}

export default Nav;
