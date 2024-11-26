import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import { useUsers } from "./UsersContext";
import { Edit, Delete } from "lucide-react";
import './userspanel.css';

const UsersPanel = () => {
    const { users, deleteUser, editUser } = useUsers();
    const [editModal, setEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

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

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id);
        }
    };

    return (
        <Container>
            <Row>
                <Col lg='12' className="m-auto">
                    <div className="users__panel">
                        <h2 className="users__title">Users Management</h2>
                        {users.length === 0 ? (
                            <p className="text-gray-500">No users registered yet.</p>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <Button color="warning" onClick={() => toggleEditModal(user)}>
                                                    <Edit className="icon" />
                                                </Button>
                                                <Button color="danger" className="ml-2" onClick={() => handleDelete(user)}>
                                                    <Delete className="icon" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Col>
            </Row>

            {/* Edit User Info Modal */}
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
                            <ModalFooter>
                                <Button type="submit" color="primary">Save Changes</Button>
                                <Button color="secondary" onClick={() => toggleEditModal(null)}>Cancel</Button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalBody>
            </Modal>
        </Container>
    );
};

export default UsersPanel;