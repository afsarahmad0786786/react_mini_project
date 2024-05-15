import { createStore } from 'redux';
import notesReducer from './reducer/noteReducer';

const store = createStore(notesReducer);

export default store;
