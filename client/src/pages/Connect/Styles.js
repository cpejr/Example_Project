import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

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

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 50px;

  h2 {
    font-size: 40px;
    line-weight: 45px;
    margin-bottom: 20px;
  }
`;

export const FormInput = styled.div`
  margin: 10px 0px;
  h3 {
    display: block;
    margin-top: 20px;
  }
  input {
    display: inline-block;
    font-size: 25px;
    padding: 10px;
    border: none;
    margin-top: 5px;
  }
`;

export const Button = styled.div`
  background: var(--success);
  text-align: center;
  max-width: 200px;
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 20px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
`;
