import { AllPostsActionTypes } from 'store/allPosts/allPosts';
import { PostsActionTypes } from 'store/myPosts/myPosts';
import { SpinnerActionTypes } from 'store/spinner/spinner';
import { UserActionTypes } from 'store/user/user';
import { DocumentData } from 'firebase/firestore';

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

export const setPosts = (posts: object[]) => {
  return {
    type: PostsActionTypes.SET_POSTS,
    payload: posts,
  };
};

export const setAllPosts = (posts: object[]) => {
  return {
    type: AllPostsActionTypes.SET_ALL_POSTS,
    payload: posts,
  };
};

export const setSpinner = (value: boolean) => {
  return {
    type: SpinnerActionTypes.SET_SPINNER,
    payload: value,
  };
};
