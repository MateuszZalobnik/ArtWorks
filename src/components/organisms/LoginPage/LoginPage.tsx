import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from 'firabase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Logo from 'components/atoms/Logo/Logo';
import { login } from 'store/actions/actions';
import { useDispatch } from 'react-redux';

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
  padding: 40px 10px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.darkBlue};
  font-size: ${({ theme }) => theme.fontSize.l};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  input {
    outline: none;
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.darkBlue};
    font-size: ${({ theme }) => theme.fontSize.l};
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.borderRadius.s};
    border: none;
    :focus {
      outline: ${({ theme }) => theme.colors.darkBlue} solid 2px;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    width: 20%;
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

const LogoWrapper = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%);
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setError('');
        dispatch(login(user.uid));
        navigate('/auth');
      })
      .catch(() => {
        setError('Zły e-mail lub hasło');
      });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleLogin}>
        <LogoWrapper>
          <Logo props />
        </LogoWrapper>
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
        <RegistrationLink to="/signup">Dołącz teraz</RegistrationLink>
      </Form>
    </Wrapper>
  );
};

export default LoginPage;
