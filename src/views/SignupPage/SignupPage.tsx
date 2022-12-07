import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db } from 'firabase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  setDoc,
  doc,
  query,
  where,
  collection,
  DocumentData,
  getDocs,
} from '@firebase/firestore';
import { Link } from 'react-router-dom';
import Logo from 'components/atoms/Logo/Logo';

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
  position: relative;
  padding: 40px 10px;
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

const LogoWrapper = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%);
`;

const SignupPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    let correctData: boolean;
    correctData = true;

    if (userData.username.length < 3 || userData.username.length >= 20) {
      correctData = false;
      setUsernameError('Nazwa użytkownika powinna mieć od 3 do 20 znaków');
    }
    if (password != confirmPassword) {
      correctData = false;
      setPasswordError('Hasła nie są identyczne');
    } else if (password.length <= 8) {
      correctData = false;
      setPasswordError('Hasło musi mieć 8 znaków lub więcej');
    }

    if (correctData == true) {
      try {
        const usersRef = collection(db, 'users');
        const usernameQueru = query(
          usersRef,
          where('username', '==', userData.username)
        );
        const emailQuery = query(
          usersRef,
          where('email', '==', userData.email)
        );

        const querySnapshotUsername = await getDocs(usernameQueru);
        const querySnapshotEmail = await getDocs(emailQuery);

        querySnapshotUsername.forEach((doc: DocumentData) => {
          if (doc.id) {
            correctData = false;
            setUsernameError('Istnieje już konto z taką nazwą użytkownika');
          }
        });
        querySnapshotEmail.forEach((doc: DocumentData) => {
          if (doc.id) {
            correctData = false;
            setEmailError('Istnieje już konto z takim emailem');
          }
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (correctData == true) {
      setEmailError('');
      setPasswordError('');
      setUsernameError('');

      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          password
        );
        const userRef = doc(db, 'users', res.user.uid);
        await setDoc(userRef, {
          ...userData,
          id: res.user.uid,
          category: 'music',
          description:
            'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.',
          numberOfViews: ['fews3232f2dasf1', 'admk3d2', 'fwescsdsqc'],
          numberOfFollows: ['fews3232f2dasf1', 'admk3d2'],
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleInput = (e: React.FormEvent) => {
    const id = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;

    setUserData({ ...userData, [id]: value });
  };
  return (
    <Wrapper>
      <Form onSubmit={handleRegister}>
        <LogoWrapper>
          <Logo props />
        </LogoWrapper>
        <H3>Zarejestruj się</H3>
        <input
          id="username"
          type="text"
          pattern="[a-zA-Z0-9]+"
          placeholder="nazwa użytkownika"
          required
          onChange={(e) => handleInput(e)}
        />
        {usernameError != '' ? (
          <ErrorMessage>{usernameError}</ErrorMessage>
        ) : null}
        <input
          id="email"
          type="email"
          placeholder="e-mail"
          required
          onChange={handleInput}
        />
        {emailError != '' ? <ErrorMessage>{emailError}</ErrorMessage> : null}
        <input
          id="password"
          type="password"
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          placeholder="hasło"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          id="passwordConfirm"
          type="password"
          pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          placeholder="powtórz hasło"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {passwordError != '' ? (
          <ErrorMessage>{passwordError}</ErrorMessage>
        ) : null}
        <Button type="submit">Zarejestruj się</Button>
      </Form>
    </Wrapper>
  );
};

export default SignupPage;
