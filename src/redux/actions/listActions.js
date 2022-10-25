import {
    LIST_ADD,
    LIST_REMOVE,
    LIST_ADD_DONE,
    LIST_REMOVE_DONE,
    LIST_UPDATE_TODO,
    LIST_DELETE_ALL,
    LIST_EDIT_TODO,
    LIST_ALL,
    ITEM_ADD,
} from '../../constants/ListConstants';
export const addList = (data) => async (dispatch, getState) => {
    console.log('data1', getState());
    dispatch({
        type: LIST_ADD,
        payload: data,
    });
    // save to local storage as listItems
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};

export const setItemList = (data) => async (dispatch, getState) => {
    console.log('hu', data);
    fetch('https://jsonplaceholder.typicode.com/users/1/todos', data)
        .then((res) => res.json())
        .then((result) => {
            dispatch({
                type: ITEM_ADD,
                payload: {
                    userId: result.userId,
                    id: result.id,
                    title: result.title,
                    completed: true,
                },
            });
        });
};

export const getAll = () => async (dispatch, getState) => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        .then((res) => res.json())
        .then((result) => {
            dispatch({
                type: LIST_ALL,
                payload: result,
            });
        });
};

export const removeList = (id) => async (dispatch, getState) => {
    dispatch({
        type: LIST_REMOVE,
        payload: id,
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};

export const addDone = (title) => async (dispatch, getState) => {
    dispatch({
        type: LIST_ADD_DONE,
        payload: {
            title: title,
            complete: true,
        },
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};

export const removeDone = (title) => async (dispatch, getState) => {
    dispatch({
        type: LIST_REMOVE_DONE,
        payload: {
            title: title,
            complete: false,
        },
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};
//  add
export const handleEditSubmit = (title) => async (dispatch, getState) => {
    dispatch({
        type: LIST_UPDATE_TODO,
        payload: {
            title: title,
            complete: false,
        },
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};
export const deleteAll = (title) => async (dispatch, getState) => {
    dispatch({
        type: LIST_DELETE_ALL,
        payload: {
            title: title,
            complete: false,
        },
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};

export const handleUpdateEditSubmit = (title) => async (dispatch, getState) => {
    dispatch({
        type: LIST_EDIT_TODO,
        payload: title,
    });
    // localStorage.setItem('listItems', JSON.stringify(getState().todoItems.todoList));
};
