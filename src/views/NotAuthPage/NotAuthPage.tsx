import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartView from 'views/StartView/StartView';
import LoginPage from 'views/LoginPage/LoginPage';
import RegistrationPage from 'views/RegistrationPage/RegistrationPage';

const NotAuthPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartView />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};

export default NotAuthPage;
