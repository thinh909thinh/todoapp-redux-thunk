import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { listReducer } from './reducers/listReducers';

const todoItemsFromStorage = [];

const reducer = combineReducers({
    todoItems: listReducer,
});

const middleware = [thunk];

const initialState = {
    todoItems: {
        todoList: todoItemsFromStorage,
    },
};

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
console.log('init: ', initialState);
export default store;
