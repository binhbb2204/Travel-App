import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useUsers } from "./UsersContext";
import { Edit, Delete } from "lucide-react"; // Import the icons from lucide-react
import './userspanel.css';

const UsersPanel = () => {
    const { users, deleteUser } = useUsers(); // Will implement this deleteUser function later
    const [expandedUser, setExpandedUser] = useState(null);

    const handleExpand = (user) => {
        setExpandedUser(expandedUser === user ? null : user);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id); // Will implement this deleteUser function later
        }
    };

    return (
        <Container>
            <Row>
                <Col lg='8' className="m-auto">
                    <div className="users__panel">
                        <h2 className="users__title">Users Management</h2>
                        {users.length === 0 ? (
                            <p className="text-gray-500">No users registered yet.</p>
                        ) : (
                            users.map((user, index) => (
                                <div key={index} className="d-flex mb-2">
                                    <div className="user__card border p-4 flex-grow-1">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={user.avatar || 'https://via.placeholder.com/40'}
                                                alt={`${user.name}'s avatar`}
                                                className="user__avatar"
                                            />
                                            <div className="flex-grow-1 d-flex justify-content-between align-items-center ml-3">
                                                <span className="font-medium">{user.name}</span>
                                                <Button
                                                    color="primary"
                                                    onClick={() => handleExpand(user)}
                                                >
                                                    {expandedUser === user ? 'Collapse' : 'View Details'}
                                                </Button>
                                            </div>
                                        </div>

                                        {expandedUser === user && (
                                            <div className="mt-2">
                                                <p><strong>Email:</strong> {user.email}</p>
                                                <p><strong>Phone:</strong> {user.phone}</p>
                                                <p><strong>Gender:</strong> {user.gender}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action buttons for edit and delete */}
                                    <div className="action-box border p-2 ml-2 d-flex flex-column justify-content-between">
                                        <Button color="warning" onClick={() => alert('Edit functionality to be implemented.')}>
                                            <Edit className="icon" /> 
                                        </Button>
                                        <Button color="danger" className="mt-2" onClick={() => handleDelete(user)}>
                                            <Delete className="icon" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UsersPanel;