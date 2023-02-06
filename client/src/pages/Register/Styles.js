import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 100%;
  height: 100%;
  max-width: 5000px;

  color: white;

  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 15px;

  p {
    color: red;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  button {
    max-width: 200px;
    padding: 10px 20px;

    text-align: center;
    font-size: 18px;
    color: #fff;

    background: var(--success);
    border-radius: 20px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;
