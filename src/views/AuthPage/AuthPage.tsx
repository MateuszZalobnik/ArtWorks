import React from 'react';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthNav from 'components/molecules/AuthMobileNav/AuthMobileNav';
import styled from 'styled-components';
import HomePage from 'components/organisms/HomePage/HomePage';
import AddNewPost from 'components/molecules/AddNewPost/AddNewPost';

const Wrapper = styled.div``;

const AuthPage: React.FC = () => {
  return (
    <Wrapper>
      <AuthNav />
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
          path="/auth/login"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
        <Route path="/" element={<Navigate replace to="/auth" />} />
      </Routes>
    </Wrapper>
  );
};

export default AuthPage;
