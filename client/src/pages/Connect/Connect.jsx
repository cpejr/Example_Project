import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, FormContainer, FormInput, Button } from './Styles';

export default function Connect() {
  const roomInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('roomName');
  });

  const handleClick = (e) => {
    e.preventDefault();

    const roomName = roomInput.current.value;

    localStorage.setItem('roomName', roomName);
    navigate('/share-files');
  };

  return (
    <Container>
      <FormContainer>
        <h2>Compartilhe seus arquivos</h2>
        <FormInput>
          <h3>Nome da Sala</h3>
          <input type="text" ref={roomInput} />
        </FormInput>
        <Button type="button" onClick={handleClick}>
          Entrar em uma sala
        </Button>
      </FormContainer>
    </Container>
  );
}
