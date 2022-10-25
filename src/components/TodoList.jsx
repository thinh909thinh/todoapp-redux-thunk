import { React, useEffect } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { getAll, addDone, deleteAll, removeDone, removeList } from '../redux/actions/listActions';

const TodoList = ({ handleEditClick, editFormVisibility }) => {
    const data = useSelector((state) => state.todoItems);
    const dispatch = useDispatch();
    const { todoList, repeat, notRepeat } = data;
    const handleDelete = (id) => {
        dispatch(removeList(id));
    };

    const handleComplete = (item) => {
        dispatch(addDone(item));
    };

    const handleNotComplete = (item) => {
        dispatch(removeDone(item));
    };
    const handleDeleteAll = (item) => {
        dispatch(deleteAll(item));
    };
    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    if (todoList.length > 0) {
        return (
            <>
                {repeat === true &&
                    toast.warn('add false', {
                        toastId: '',
                    })}
                {notRepeat === true &&
                    toast.success('add ok', {
                        toastId: '',
                    })}
                <ListGroup className="ListscrollY">
                    {todoList.map((data, index) => (
                        <ListGroup.Item
                            className=" mb-1"
                            variant={data.complete === true ? 'success' : 'primary'}
                            key={data.id}
                        >
                            <Row>
                                <Col xl={6} xxl={6} lg={6} md={6} xs={6} style={{ overflow: 'hidden' }}>
                                    {index + 1} - {data.title}{' '}
                                </Col>

                                {editFormVisibility === false && (
                                    <>
                                        <Col
                                            xl={2}
                                            xxl={2}
                                            lg={2}
                                            md={2}
                                            xs={2}
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            {data.complete === true ? (
                                                <Button variant="success" onClick={() => handleNotComplete(data.title)}>
                                                    <i className="fa-solid fa-check"></i>
                                                </Button>
                                            ) : (
                                                <Button variant="primary" onClick={() => handleComplete(data.title)}>
                                                    <i className="fa-solid fa-bullseye"></i>
                                                </Button>
                                            )}
                                        </Col>

                                        <Col
                                            xl={2}
                                            xxl={2}
                                            lg={2}
                                            md={2}
                                            xs={2}
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            {/* update item  */}
                                            <Button variant="warning" onClick={() => handleEditClick(data)}>
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </Button>
                                        </Col>

                                        <Col
                                            xl={2}
                                            xll={2}
                                            lg={2}
                                            md={2}
                                            xs={2}
                                            style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        >
                                            {/* delete item  */}
                                            <Button variant="dark" onClick={() => handleDelete(data.id)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {/* deleteAll  */}
                {todoList.length > 1 && (
                    <div>
                        <Button variant="danger" onClick={() => handleDeleteAll()}>
                            <i className="fas fa-trash"></i> Delete all
                        </Button>
                    </div>
                )}
            </>
        );
    } else {
        return (
            <ListGroup>
                <ListGroup.Item className="text-center">Nothing</ListGroup.Item>
            </ListGroup>
        );
    }
};

export default TodoList;
