import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StartPage from 'components/organisms/StartPage/StartPage';
import LoginPage from 'components/organisms/LoginPage/LoginPage';
import SignupPage from 'components/organisms/SignupPage/SignupPage';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';

const NotAuthPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/:username"
        element={
          <ProfilePage
            uid={null}
            setIsOpenEditWindow={null}
            userDocRef={null}
          />
        }
      />
    </Routes>
  );
};

export default NotAuthPage;
