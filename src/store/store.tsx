import { createStore, combineReducers } from 'redux';
import { userReducer } from 'features/user/user';

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer);
