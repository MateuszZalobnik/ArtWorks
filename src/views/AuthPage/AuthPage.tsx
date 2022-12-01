import React from 'react';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Route, Routes, Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  return (
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
  );
};

export default AuthPage;
