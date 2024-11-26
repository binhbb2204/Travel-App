import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { useUsers } from "./UsersContext";
import { Edit, Delete } from "lucide-react";
import './userspanel.css';

const UsersPanel = () => {
    const { users, deleteUser, editUser } = useUsers();
    const [expandedUser, setExpandedUser] = useState(null);
    const [editModal, setEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const handleExpand = (user) => {
        setExpandedUser(expandedUser === user ? null : user);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id);
        }
    };

    const toggleEditModal = (user) => {
        setCurrentUser(user);
        setEditModal(!editModal);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const updatedUser = {
            ...currentUser,
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            gender: event.target.gender.value,
        };
        editUser(updatedUser);
        toggleEditModal(null); 
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
                                        <Button color="warning" onClick={() => toggleEditModal(user)}>
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

            {/* Edit User Info */}
            <Modal isOpen={editModal} toggle={() => toggleEditModal(null)} centered>
                <ModalHeader toggle={() => toggleEditModal(null)}>Edit User Info</ModalHeader>
                <ModalBody>
                    {currentUser && (
                        <Form onSubmit={handleEditSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" id="name" defaultValue={currentUser.name} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" id="email" defaultValue={currentUser.email} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phone">Phone</Label>
                                <Input type="text" id="phone" defaultValue={currentUser.phone} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender">Gender</Label>
                                <Input type="select" id="gender" defaultValue={currentUser.gender} required>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Input>
                            </FormGroup>
                            <Button type="submit" color="primary">Save Changes</Button>
                        </Form>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleEditModal(null)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default UsersPanel;