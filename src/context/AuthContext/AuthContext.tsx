import { auth } from 'firabase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const initialState = {
  currentUser: auth.currentUser ? auth.currentUser : null,
  uid: auth.currentUser ? auth.currentUser.uid : null,
};

type initialStateType = {
  currentUser: User | null;
  uid: any;
};

export const AuthContext = createContext<{
  state: initialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AuthContextProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        dispatch({ type: 'LOGOUT', payload: user });
      }
    });
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
