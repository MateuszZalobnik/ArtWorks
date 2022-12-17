import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthMobileNav from 'components/molecules/AuthMobileNav/AuthMobileNav';
import styled from 'styled-components';
import HomePage from 'components/organisms/HomePage/HomePage';
import AddNewPost from 'components/molecules/AddNewPost/AddNewPost';
import AuthDeskNav from 'components/molecules/AuthDeskNav/AuthDeskNav';
import { db } from 'firabase-config';
import { doc, DocumentData, getDoc, onSnapshot } from 'firebase/firestore';
import ProfilePage from 'components/organisms/ProfilePage/ProfilePage';
import EditUserInfo from 'components/molecules/EditUserInfo/EditUserInfo';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, setUser } from 'actions/actions';
import { UserState } from 'features/user/user';

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

const AuthPage: React.FC<{ uid: string }> = ({ uid }) => {
  const state = useSelector((state: { user: UserState }) => state.user);
  const [isOpenEditWindow, setIsOpenEditWindow] = useState(false);
  const [data, setData] = useState<DocumentData | null | void>(null);
  const [loading, setLoading] = useState(true);

  const userDocRef = doc(db, 'users', uid);

  const getDocument = async () => {
    const docSnap = await getDoc(userDocRef);
    onSnapshot(userDocRef, async (doc) => {
      dispatch(setUser(docSnap.data(doc.data())));
      setData(docSnap.data(doc.data()));
      setLoading(false);
    });
  };

  // const counter = useSelector((state) => state.counter);
  // const dispatch = useDispatch();
  // const increment = () => {
  //   dispatch({ type: 'INC' });
  // };

  const counter = useSelector((state: { user: UserState }) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state);
    getDocument();
    // console.log(data);
  }, [loading, isOpenEditWindow]);

  return (
    <>
      <AuthMobileNav myAccount={data ? data.username : ''} />
      <AuthDeskNav myAccount={data ? data.username : ''} />
      <Wrapper>
        <button onClick={() => dispatch(increment(2))}>+</button>
        <div>{counter}</div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <Routes>
          <Route
            path="/auth"
            element={
              <>
                <HomePage uid={uid} />
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
                        setIsOpenEditWindow={setIsOpenEditWindow}
                        userDocRef={userDocRef}
                        username={data.username}
                        description={data.description}
                        category={data.category}
                      />
                    </EditUserInfoWrapper>
                  ) : null}
                  <ProfilePage
                    uid={uid}
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
                <AddNewPost uid={uid} />
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
