import Header from './Header';


export default function Nav({ isLoggedIn }) {
  return (
    <nav>
      {isLoggedIn && <Header token={isLoggedIn} />}
    </nav>
  );
}
