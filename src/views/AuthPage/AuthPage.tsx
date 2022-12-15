import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthMobileNav from 'components/molecules/AuthMobileNav/AuthMobileNav';
import styled from 'styled-components';
import HomePage from 'components/organisms/HomePage/HomePage';
import AddNewPost from 'components/molecules/AddNewPost/AddNewPost';
import AuthDeskNav from 'components/molecules/AuthDeskNav/AuthDeskNav';
import { AuthContext } from 'context/AuthContext/AuthContext';
import { db } from 'firabase-config';
import { doc } from 'firebase/firestore';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';

const Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mq.desktop} {
    width: 75%;
    margin-left: 25%;
  }
`;

const AuthPage: React.FC = () => {
  const {
    state: { uid },
  } = useContext(AuthContext);

  const userDocRef = doc(db, 'users', uid);
  return (
    <>
      <AuthMobileNav />
      <AuthDeskNav />
      <Wrapper>
        <Routes>
          <Route
            path="/auth"
            element={
              <>
                <HomePage />
              </>
            }
          />
          <Route path="/auth">
            <Route
              path=":username"
              element={<ProfilePage userDocRef={userDocRef} />}
            />
          </Route>
          <Route
            path="/auth/add"
            element={
              <>
                <AddNewPost />
              </>
            }
          />
          <Route path="/" element={<Navigate replace to="/auth" />} />
        </Routes>
      </Wrapper>
    </>
  );
};

export default AuthPage;
