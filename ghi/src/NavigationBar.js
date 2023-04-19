import Header from './Header';


function Nav({ isLoggedIn }) {

  return (
    <nav>
      {isLoggedIn && <Header token={isLoggedIn} />}
    </nav>
  );
}

export default Nav;
