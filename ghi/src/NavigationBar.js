import Header from './Header';


function Nav({ isLoggedIn }) {

  return (
    <nav>
      {isLoggedIn && <Header />}
    </nav>
  );
}

export default Nav;
