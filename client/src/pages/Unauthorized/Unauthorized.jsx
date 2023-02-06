import { useNavigate } from 'react-router-dom';
import { Container } from './Styles';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <Container>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </Container>
    </section>
  );
}

export default Unauthorized;
