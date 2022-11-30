import React, { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const initialState = {
  currentUser: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null,
};

type initialStateType = {
  currentUser: any;
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
    localStorage.setItem('user', JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
