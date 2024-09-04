import { createStore } from 'redux';
import visibilityReducer from './visibilityReducer';

const store = createStore(visibilityReducer);

export default store;
