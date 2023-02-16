import { useNavigate, Link } from 'react-router-dom';
import { useLogout } from '../../hooks/query/sessionQuery';

function Home() {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout({ onSuccess: () => navigate('/login') });

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/connect">Go to the Connect page</Link>
      <br />
      <Link to="/share-files">Go to the Share Files page</Link>
      <br />
      <Link to="/register">Go to the Register page</Link>
      <br />
      <Link to="/login">Go to the Login page</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button type="button" onClick={logout}>
          Sign Out
        </button>
      </div>
    </section>
  );
}

export default Home;
