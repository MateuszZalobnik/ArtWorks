import React from 'react';
import AuthHeader from 'components/molecules/AuthHeader/AuthHeader';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import { Route, Routes, Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <AuthHeader />
            <ProfilePage />
          </>
        }
      />
      <Route
        path="/login/register"
        element={
          <>
            <AuthHeader />
            Dopasuj swój profil <br />
            <Link to="/login">poźniej</Link>
          </>
        }
      />
    </Routes>
  );
};

export default AuthPage;
