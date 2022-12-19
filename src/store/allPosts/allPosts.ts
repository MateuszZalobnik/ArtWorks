import { Reducer } from 'redux';

export enum AllPostsActionTypes {
  SET_ALL_POSTS = 'SET_ALL_POSTS',
}

export interface AllPostsState {
  posts: { id: string }[] | null;
}

const initialState: AllPostsState = {
  posts: null,
};

export const allPostsReducer: Reducer<AllPostsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AllPostsActionTypes.SET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
