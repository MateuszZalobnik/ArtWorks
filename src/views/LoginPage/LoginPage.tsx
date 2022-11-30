import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Header from 'components/molecules/Header/Header';
import { auth } from 'firabase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from 'context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  img {
    margin: 40px 0px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  margin-top: 100px;
  width: 80%;
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  border-radius: ${({ theme }) => theme.borderRadius.m};
  input {
    outline: none;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.darkBlue};
    font-size: ${({ theme }) => theme.fontSize.l};
    background-color: ${({ theme }) => theme.colors.grey};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: none;
    :focus {
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }
`;

const H3 = styled.h3`
  display: flex;
  justify-content: center;
  margin: 0px;
`;
const PasswordReset = styled.span`
  font-size: ${({ theme }) => theme.fontSize.m};
`;
const ErrorMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.red};
`;
const Button = styled.button`
  margin-top: 40px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const RegistrationLink = styled(Link)`
  margin-top: 40px;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.darkBlue};
  text-decoration: none;
  display: flex;
  justify-content: center;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.uid;
        setError('');
        dispatch({ type: 'LOGIN', payload: user });
      })
      .catch(() => {
        setError('Zły e-mail lub hasło');
      });
  };

  return (
    <Wrapper>
      <Header />
      <Form onSubmit={handleLogin}>
        <H3>Zaloguj się</H3>
        <input
          id="email"
          type="email"
          placeholder="e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="password"
          type="password"
          placeholder="hasło"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordReset>zapomniałem hasła</PasswordReset>
        {error != '' ? <ErrorMessage>{error}</ErrorMessage> : null}
        <Button type="submit">Zaloguj</Button>
        <RegistrationLink to="/register">Dołącz teraz</RegistrationLink>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
