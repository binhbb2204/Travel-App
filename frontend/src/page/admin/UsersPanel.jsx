import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table, Alert } from 'reactstrap';
import { Plus, Edit, Trash2, EyeIcon, Landmark } from 'lucide-react';
import { authService } from "../../data/Service/authService";

const UsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [notification, setNotification] = useState({ message: '', visible: false });
    const token = authService.getCurrentUser().token;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data.success) {
                    setUsers(response.data.data);
                } else {
                    console.error('Failed to fetch users:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]);

    const toggleEditModal = (user) => {
        setCurrentUser(user);
        setEditModal(!editModal);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const updatedUser = {
            ...currentUser,
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            gender: event.target.gender.value,
        };

        try {
            await axios.put(`http://localhost:8000/api/v1/users/${currentUser._id}`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.map(user => (user._id === currentUser._id ? updatedUser : user)));
            setNotification({ message: 'Update successful. Your changes have been saved!', visible: true });
            setTimeout(() => {
                setNotification({ ...notification, visible: false });
            }, 2000); 
            toggleEditModal(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/users/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(users.filter(u => u._id !== user._id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleViewUser = (user) => {
        alert(`Viewing details for ${user.name}`);
    };

    return (
        <Container>
            {notification.visible && (
                <Alert color="success" toggle={() => setNotification({ ...notification, visible: false })}>
                    {notification.message}
                </Alert>
            )}
            <Row>
                <Col lg='12' className="m-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 flex justify-between items-center border-b border-blue-100">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <Landmark className="mr-3 text-blue-600" size={24} />
                                User Management
                            </h2>
                        </div>
                        {users.length === 0 ? (
                            <div className="p-4 flex justify-center items-center h-96">
                                <p className="text-gray-500">No users registered yet. Create your first user!</p>
                            </div>
                        ) : (
                            <Table striped>
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Gender</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user._id} className="border-b hover:bg-white transition">
                                            <td className="p-4">{index + 1}</td>
                                            <td className="p-4">{user.name}</td>
                                            <td className="p-4">{user.email}</td>
                                            <td className="p-4">{user.phone}</td>
                                            <td className="p-4">{user.gender}</td>
                                            <td className="p-3">
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => handleViewUser(user)}
                                                        className="text-blue-500 hover:bg-blue-50 p-2 rounded-full flex items-center justify-center"
                                                    >
                                                        <EyeIcon size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => toggleEditModal(user)}
                                                        className="text-green-500 hover:bg-green-50 p-2 rounded-full flex items-center justify-center"
                                                    >
                                                        <Edit size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(user)}
                                                        className="text-red-500 hover:bg-red-50 p-2 rounded-full flex items-center justify-center"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
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