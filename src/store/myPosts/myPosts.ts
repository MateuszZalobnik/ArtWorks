import { Reducer } from 'redux';

export enum PostsActionTypes {
  SET_POSTS = 'SET_POSTS',
}

export interface PostsState {
  posts: object[] | null;
}

const initialState: PostsState = {
  posts: null,
};

export const myPostsReducer: Reducer<PostsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PostsActionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};
