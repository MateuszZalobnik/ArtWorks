import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from 'components/organisms/StartPage/StartPage';
import LoginPage from 'components/organisms/LoginPage/LoginPage';
import SignupPage from 'components/organisms/SignupPage/SignupPage';

const NotAuthPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default NotAuthPage;
