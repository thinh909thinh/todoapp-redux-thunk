import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setItemList, addList, handleUpdateEditSubmit } from '../redux/actions/listActions';
const TodoListForm = ({ setEditFormVisibility, editFormVisibility, editTodo, cancelUpdate }) => {
    const dispatch = useDispatch();
    // const [list, setList] = useState();
    const [item, setItem] = useState();
    function create(todoListValue, callback) {
        console.log(todoListValue);
        const options = {
            method: 'POST',
            body: JSON.stringify(todoListValue),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        dispatch(setItemList(options));
    }

    // submit
    const submitHandler = (e) => {
        const todoListValue = {
            userId: 9,
            id: Math.floor(Math.random() * 10000000001),
            title: item,
            completed: false,
        };
        e.preventDefault();
        dispatch(addList(todoListValue));
        create(todoListValue);
        setItem('');
    };

    const [editValue, setEditValue] = useState();

    useEffect(() => {
        if (!editTodo) {
            return;
        }
        setEditValue(editTodo.title);
    }, [editTodo]);

    const editSubmit = (e) => {
        setEditFormVisibility(false);
        e.preventDefault();
        const todoListValue = {
            ...editTodo,
            title: editValue,
        };
        dispatch(handleUpdateEditSubmit(todoListValue));
        // setEditValue('');
    };

    return (
        <>
            {editFormVisibility === false ? (
                <>
                    <Form className="mx-2 my-2" onSubmit={submitHandler}>
                        <Form.Group controlId="inputList">
                            <Row>
                                <div className="text-center">Add your todo-item</div>
                                <Col md={8} lg={9}>
                                    <Form.Control
                                        type="text"
                                        value={item || ''}
                                        onChange={(e) => setItem(e.target.value)}
                                        placeholder="Enter list"
                                        required
                                    />
                                </Col>
                                <Col md={4} lg={3} className="mt-sm-1 mt-md-0 ">
                                    <Button type="submitted">Add Item</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                    {/* <ToastContainer
                        position="bottom-left"
                        autoClose={1000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    /> */}
                </>
            ) : (
                <Form className="mx-2 my-2" onSubmit={editSubmit}>
                    <Form.Group controlId="inputList">
                        <Row>
                            <div className="text-center">Edit your todo-item</div>
                            <Col lg={12} md={12}>
                                <Form.Control
                                    type="text"
                                    value={editValue || ''}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="Enter list"
                                    required
                                />
                            </Col>
                            <Col lg={12} md={12} style={{ justifyContent: 'space-between' }}>
                                <Row>
                                    <Col lg={6} md={6} className="mt-1">
                                        <Button style={{ width: '100%' }} type="submitted">
                                            UPDATE
                                        </Button>
                                    </Col>

                                    <Col lg={6} md={6} className="mt-1">
                                        <Button
                                            style={{ width: '100%' }}
                                            type="button"
                                            variant="success"
                                            onClick={cancelUpdate}
                                        >
                                            CANCEL
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            )}
        </>
    );
};

export default TodoListForm;
