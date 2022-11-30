import { GlobalStyle } from 'assets/styles/GlobalStyles';
import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext/AuthContext';
import AuthPage from 'views/AuthPage/AuthPage';
import NotAuthPage from 'views/NotAuthPage/NotAuthPage';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  min-height: 100vh;
  width: 100%;
`;

const App = () => {
  const {
    state: { currentUser },
  } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <BrowserRouter>
          {currentUser ? <AuthPage /> : <NotAuthPage />}
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;

// import React, { useEffect, useState, useRef } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { db, storage } from './firabase-config';
// import { collection, DocumentData, getDocs } from 'firebase/firestore';
// import { listAll, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { v4 } from 'uuid';
// import { useAuth } from 'AuthContext';

// function App() {
//   const [imageUpload, setImageUpload] = useState<FileList | null | any>([]);
//   const [imageList, setImageList] = useState<any>([]);
//   const [users, setUsers] = useState<DocumentData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const useCollectionRef = collection(db, 'users');

//   const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
//   const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
//   const passwordConfirmRef =
//     useRef() as React.MutableRefObject<HTMLInputElement>;
//   const { signup, currentUser } = useAuth();
//   const [error, setError] = useState('');
//   const [loadingAuth, setAuthLoading] = useState(false);

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError('Password do not match');
//     }
//     try {
//       setError('');
//       setAuthLoading(true);
//       await signup(emailRef.current.value, passwordRef.current.value);
//     } catch {
//       setError('Failed to create an account');
//     }
//     setAuthLoading(false);
//   }

//   const imageListRef = ref(storage, 'images/');
//   const uploadImage = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       alert('image uploaded');
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageList((prev: any) => [...prev, url]);
//       });
//     });
//   };

//   const getUsers = async () => {
//     const tmpUsers: DocumentData[] = [];
//     await getDocs(useCollectionRef).then((querySnapshot) => {
//       querySnapshot.docs.map((doc: DocumentData) => {
//         tmpUsers.push(doc.data());
//       });
//       setUsers(tmpUsers);
//       setIsLoading(false);
//     });
//   };

//   useEffect(() => {
//     listAll(imageListRef).then((res) => {
//       setImageList([]);
//       res.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageList((prev: any) => [...prev, url]);
//         });
//       });
//     });
//     getUsers();
//   }, []);
//   !isLoading ? console.log(users) : console.log('wait...');

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//       <div>
//         {currentUser && currentUser.email}
//         <br />
//         {error && <h3>{error}</h3>}
//         <input
//           id="email"
//           type="email"
//           placeholder="Email"
//           ref={emailRef}
//           required
//         />
//         <input
//           id="password"
//           type="password"
//           placeholder="Password"
//           ref={passwordRef}
//           required
//         />
//         <input
//           id="passwordConfirm"
//           type="password"
//           placeholder="Password confirm"
//           ref={passwordConfirmRef}
//           required
//         />
//         <button disabled={loadingAuth} onClick={handleSubmit} type="submit">
//           sign up
//         </button>
//       </div>
//       <input
//         type="file"
//         onChange={(event) => {
//           setImageUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadImage}>Upload Image</button>
//       {imageList.map((url: any) => {
//         return <img src={url} />;
//       })}
//     </div>
//   );
// }

// export default App;
