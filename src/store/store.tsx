import { createStore, combineReducers } from 'redux';
import { userReducer } from 'store/user/user';
import { myPostsReducer } from 'store/myPosts/myPosts';
import { allPostsReducer } from 'store/allPosts/allPosts';
import { spinnerReducer } from 'store/spinner/spinner';

const rootReducer = combineReducers({
  user: userReducer,
  myposts: myPostsReducer,
  allposts: allPostsReducer,
  spinner: spinnerReducer,
});

export const store = createStore(rootReducer);
