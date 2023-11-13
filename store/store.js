import { createStore, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from '../src/redux/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const makeStore = () => createStore(rootReducer);

export const wrapper = createWrapper(makeStore);
