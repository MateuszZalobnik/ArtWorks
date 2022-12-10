import React from 'react';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Route, Routes } from 'react-router-dom';
import AuthNav from 'components/molecules/AuthNav/AuthNav';
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
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/add"
          element={
            <>
              <AddNewPost />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
      </Routes>
    </Wrapper>
  );
};

export default AuthPage;
