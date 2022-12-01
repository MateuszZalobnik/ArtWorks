import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartView from 'views/StartView/StartView';
import LoginPage from 'views/LoginPage/LoginPage';
import SignupPage from 'views/SignupPage/SignupPage';

const NotAuthPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartView />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default NotAuthPage;
