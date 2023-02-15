import { Link, Navigate } from 'react-router-dom';

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <br />
      <Link to="/register">Go to the Register page</Link>
      <br />
      <Link to="/login">Go to the Login page</Link>
    </section>
  );
}

export default Home;
