import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthMobileNav from 'components/molecules/AuthMobileNav/AuthMobileNav';
import styled from 'styled-components';
import HomePage from 'components/organisms/HomePage/HomePage';
import AddNewPost from 'components/molecules/AddNewPost/AddNewPost';
import AuthDeskNav from 'components/molecules/AuthDeskNav/AuthDeskNav';
import { AuthContext } from 'context/AuthContext/AuthContext';
import { db } from 'firabase-config';
import { doc, DocumentData, getDoc, onSnapshot } from 'firebase/firestore';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import EditUserInfo from 'components/molecules/EditUserInfo/EditUserInfo';

const Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mq.desktop} {
    width: 75%;
    margin-left: 25%;
  }
`;

const EditUserInfoWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  background: rgba(255, 255, 255, 0.5);
  height: 100vh;
  width: 100%;
  z-index: 1000;
  font-size: ${({ theme }) => theme.fontSize.xxl};
`;

const AuthPage: React.FC = () => {
  const {
    state: { uid },
  } = useContext(AuthContext);
  const [isOpenEditWindow, setIsOpenEditWindow] = useState(false);
  const [data, setData] = useState<DocumentData | null | void>(null);
  const [loading, setLoading] = useState(true);
  const userDocRef = doc(db, 'users', uid);

  const getDocument = async () => {
    const docSnap = await getDoc(userDocRef);
    onSnapshot(userDocRef, async (doc) => {
      setData(docSnap.data(doc.data()));
      setLoading(false);
    });
  };

  useEffect(() => {
    if (loading == true) {
      getDocument();
    }
  }, [loading]);
  
  return (
    <>
      <AuthMobileNav myAccount={data ? data.username : ''} />
      <AuthDeskNav myAccount={data ? data.username : ''} />
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
          <Route path="/auth">
            <Route
              path=":username"
              element={
                <>
                  {isOpenEditWindow && data ? (
                    <EditUserInfoWrapper>
                      <EditUserInfo
                        setLoading={setLoading}
                        setIsOpenEditWindow={setIsOpenEditWindow}
                        userDocRef={userDocRef}
                        username={data.username}
                        description={data.description}
                        category={data.category}
                      />
                    </EditUserInfoWrapper>
                  ) : null}
                  <ProfilePage
                    setIsOpenEditWindow={setIsOpenEditWindow}
                    userDocRef={userDocRef}
                  />
                </>
              }
            />
          </Route>
          <Route
            path="/auth/add"
            element={
              <>
                <AddNewPost />
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
