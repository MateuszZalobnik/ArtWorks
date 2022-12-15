import React, { useState } from 'react';
import { auth, db } from 'firabase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, DocumentData } from '@firebase/firestore';
import Logo from 'components/atoms/Logo/Logo';
import * as EmailValidator from 'email-validator';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  ErrorMessage,
  Form,
  H3,
  LogoWrapper,
  Wrapper,
} from './SingupPage.style';
import useFirestore from 'hooks/useFirestore/useFirestore';

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
  const { getQueryCollection } = useFirestore();

  const navigate = useNavigate();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');
    setUsernameError('');

    let correctData: boolean;
    correctData = true;

    //check username length
    if (userData.username.length < 3 || userData.username.length >= 20) {
      correctData = false;
      setUsernameError('Nazwa użytkownika powinna mieć od 3 do 20 znaków');
    }
    //check passwords
    if (password != confirmPassword) {
      correctData = false;
      setPasswordError('Hasła nie są identyczne');
    } else if (password.length <= 8) {
      correctData = false;
      setPasswordError('Hasło musi mieć 8 znaków lub więcej');
    }

    //check existing username and email
    if (correctData == true) {
      try {
        const querySnapshotUsername = await getQueryCollection(
          'users',
          'username',
          '==',
          userData.username
        );
        querySnapshotUsername.forEach((doc: DocumentData) => {
          if (doc.id) {
            correctData = false;
            setUsernameError('Istnieje już konto z taką nazwą użytkownika');
          }
        });
        const querySnapshotEmail = await getQueryCollection(
          'users',
          'email',
          '==',
          userData.email
        );
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
    //email validation
    if (correctData == true) {
      if (EmailValidator.validate(userData.email) == false) {
        setEmailError('Niepoprawny email');
        correctData = false;
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
          category: '',
          description: '',
          numberOfViews: ['fews3232f2dasf1', 'admk3d2', 'fwescsdsqc'],
          numberOfFollows: ['fews3232f2dasf1', 'admk3d2'],
        });
        navigate('/auth/myaccount');
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
