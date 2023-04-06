import { NavLink } from 'react-router-dom';
import { useLogoutUserMutation } from './store/authApi';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();
    const [logout, result] = useLogoutUserMutation();

    async function handleClick(e) {
        e.preventDefault();
        await logout().then(() => {
            navigate("/");
        });
    }

    return (
        <nav>
            <ul>
                <li>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    hi </button>
                    <NavLink id="logout" to="/token" onClick={handleClick}> Logout </NavLink>
                </li>
            </ul>
        </nav>
    )

}

export default Nav;
