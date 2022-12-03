import React from 'react';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Route, Routes } from 'react-router-dom';
import AuthNav from 'components/molecules/AuthNav/AuthNav';
import styled from 'styled-components';

const Wrapper = styled.div``;

const AuthPage: React.FC = () => {
  return (
    <Wrapper>
      <AuthNav />
      <Routes>
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
