import { Link } from 'react-router-dom';
import { Container } from './Styles';

function Missing() {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <Container>
        <Link to="/">Visit our Welcome page</Link>
      </Container>
    </article>
  );
}

export default Missing;
