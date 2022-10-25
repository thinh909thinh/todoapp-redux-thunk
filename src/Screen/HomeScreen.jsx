import { React, useState } from 'react';
import { Card } from 'react-bootstrap';
import TodoListForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { ToastContainer } from 'react-toastify';
const HomeScreen = () => {
    const [editFormVisibility, setEditFormVisibility] = useState(false);

    const [editTodo, setEditTodo] = useState();

    const handleEditClick = (data) => {
        setEditFormVisibility(true);
        setEditTodo(data);
        console.log(data);
    };

    const cancelUpdate = () => {
        setEditFormVisibility(false);
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
            <h1 className="text-info text-center">TO DO APP</h1>
            <Card>
                <TodoListForm
                    setEditFormVisibility={setEditFormVisibility}
                    editFormVisibility={editFormVisibility}
                    editTodo={editTodo}
                    cancelUpdate={cancelUpdate}
                />
            </Card>

            <h1 className="text-info text-center">A to-do list to organize your work &amp; life</h1>
            <TodoList handleEditClick={handleEditClick} editFormVisibility={editFormVisibility} />
        </>
    );
};

export default HomeScreen;
