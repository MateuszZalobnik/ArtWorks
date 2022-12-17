import { UserActionTypes } from 'features/user/user';
import { DocumentData } from 'firebase/firestore';

export const increment = (value: number) => {
  return {
    type: UserActionTypes.INC,
    payload: value,
  };
};

export const decrement = () => ({
  type: UserActionTypes.DEC,
});

export const setUser = (user: DocumentData | undefined) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
};

export const changeProfile = (username: string) => {
  return {
    type: UserActionTypes.CHANGE_PROFILE,
    payload: username,
  };
};

export const changeProfilePhoto = (url: string) => {
  return {
    type: UserActionTypes.CHANGE_PROFILE_PHOTO,
    payload: url,
  };
};

export const login = (uid: string) => {
  return {
    type: UserActionTypes.LOGIN,
    payload: uid,
  };
};

export const logout = () => {
  return {
    type: UserActionTypes.LOGOUT,
  };
};
