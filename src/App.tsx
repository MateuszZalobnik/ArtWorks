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
import { login, setAllPosts } from 'store/actions/actions';
import { useSelector } from 'react-redux';
import { UserState } from 'store/user/user';
import { DocumentData } from 'firebase/firestore';
import { AllPostsState } from 'store/allPosts/allPosts';
import LoadingSpinner from 'components/molecules/LoadingSpinner/LoadingSpinner';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.darkBlue};
  min-height: 100vh;
  width: 100%;
`;

const App = () => {
  const [currentUser, setCurrentUser] = useState<null | User>(null);
  const currentPosts = useSelector(
    (state: { allposts: AllPostsState }) => state.allposts.posts
  );
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

  const getPosts = async () => {
    const posts: DocumentData[] = [];
    getAllCollection('posts')
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
      })
      .then(() => {
        dispatch(setAllPosts(posts));
      });
  };

  useEffect(() => {
    getPosts();
  }, [firestoreLoading]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <BrowserRouter>
          <LoadingSpinner />
          {currentUser && uid ? <AuthPage uid={uid} /> : <NotAuthPage />}
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
