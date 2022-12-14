import React from 'react';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthMobileNav from 'components/molecules/AuthMobileNav/AuthMobileNav';
import styled from 'styled-components';
import HomePage from 'components/organisms/HomePage/HomePage';
import AddNewPost from 'components/molecules/AddNewPost/AddNewPost';
import AuthDeskNav from 'components/molecules/AuthDeskNav/AuthDeskNav';

const Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mq.desktop} {
    width: 75%;
    margin-left: 25%;
  }
`;

const AuthPage: React.FC = () => {
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
          <Route
            path="/auth/add"
            element={
              <>
                <AddNewPost />
              </>
            }
          />
          <Route
            path="/auth/myaccount"
            element={
              <>
                <ProfilePage />
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
