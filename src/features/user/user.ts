import { Reducer } from 'redux';

export enum UserActionTypes {
  INC = 'INC',
  DEC = 'DEC',
  SET_USER = 'SET_USER',
  CHANGE_PROFILE = 'CHANGE_PROFILE',
  CHANGE_PROFILE_PHOTO = 'CHANGE_PROFILE_PHOTO',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface UserState {
  value: number;
  uid: string | null;
  user: {
    id: string;
    username: string;
    profileImgUrl: string;
    category: string;
    description: string;
    numberOfViews: string[];
    numberOfFollows: string[];
  } | null;
}

const initialState: UserState = {
  value: 0,
  uid: null,
  //   username: null,
  //   email: null,
  user: null,
};

export const userReducer: Reducer<UserState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UserActionTypes.INC:
      return {
        ...state,
        value: state.value + action.payload,
      };
    case UserActionTypes.DEC:
      return {
        ...state,
        value: state.value - 1,
      };
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.CHANGE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    case UserActionTypes.CHANGE_PROFILE_PHOTO:
      return {
        ...state,
        user: {
          ...state.user,
          profileImgUrl: action.payload,
        },
      };
    case UserActionTypes.LOGIN: {
      return {
        ...state,
        uid: action.payload,
      };
    }
    case UserActionTypes.LOGOUT: {
      return {
        ...state,
        user: null,
        uid: null,
      };
    }
    default:
      return state;
  }
};
