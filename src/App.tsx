import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { BrowserRouter } from 'react-router-dom';
import AuthPage from 'views/AuthPage/AuthPage';
import NotAuthPage from 'views/NotAuthPage/NotAuthPage';
import { auth } from 'firabase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import useFirestore from 'hooks/useFirestore/useFirestore';
import { useDispatch } from 'react-redux';
import { login } from 'actions/actions';
import { useSelector } from 'react-redux';
import { UserState } from 'features/user/user';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  min-height: 100vh;
  width: 100%;
`;

const App = () => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  const dispatch = useDispatch();
  const uid = useSelector((state: { user: UserState }) => state.user.uid);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(login(user.uid));
      setCurrentUser(user);
    } else {
      setCurrentUser(user);
    }
  });
  const { getAllCollection, firestoreLoading } = useFirestore();

  useEffect(() => {
    // if (firestoreLoading == true) {
    //   getAllCollection('users').then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // console.log(doc.data());
    //     });
    //   });
    // }
  }, [firestoreLoading]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <BrowserRouter>
          {currentUser && uid ? <AuthPage uid={uid} /> : <NotAuthPage />}
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
