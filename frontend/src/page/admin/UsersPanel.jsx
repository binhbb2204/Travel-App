import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Table,
    Alert
} from 'reactstrap';
import { Edit, Trash2, EyeIcon, Landmark } from 'lucide-react';
import { authService } from "../../data/Service/authService";
import { userService } from "../../data/Service/userService"

const UsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [viewModal, setViewModal] = useState(false); // State for viewing user details
    const [currentUser, setCurrentUser] = useState(null);
    const [notification, setNotification] = useState({ message: '', visible: false });
    const token = authService.getCurrentUser().token;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAllUsers();
                console.log('Full response:', response);
                if (response) {
                    setUsers(response);
                } else {
                    console.error('Failed to fetch users:', response.message);
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

    const toggleViewModal = () => {
        setViewModal(!viewModal);
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
            await userService.updateUserProfile(currentUser._id, updatedUser)
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
        setCurrentUser(user);
        toggleViewModal();
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
                            <div className="max-h-[600px] overflow-y-auto"> 
                                <table className="w-full">
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
                                            <tr key={user._id} className="border-b hover:bg-white transition ">
                                                <td className="p-4">{user._id}</td>
                                                <td className="p-4">{user.name}</td>
                                                <td className="p-4">{user.email}</td>
                                                <td className="p-4">{user.phone}</td>
                                                <td className="p-4">{user.gender}</td>
                                                <td className="p-4">
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
                                </table>
                            </div>
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
                                <button 
                                type="submit" 
                                className="w-full sm:w-auto 
                                px-4 py-2 text-sm 
                                bg-blue-500 text-white 
                                hover:bg-blue-600 
                                rounded-md
                                transition-colors duration-200"
                                >
                                    Save Changes
                                </button>
                                <button 
                                className="w-full sm:w-auto 
                                px-4 py-2 text-sm 
                                bg-red-500 text-white 
                                hover:bg-red-600 
                                rounded-md
                                transition-colors duration-200" onClick={() => toggleEditModal(null)}
                                >
                                    Cancel
                                </button>
                            </ModalFooter>
                        </Form>
                    )}
                </ModalBody>
            </Modal>

            {/* View User Info Modal */}
            <Modal isOpen={viewModal} toggle={toggleViewModal} centered>
                <ModalHeader toggle={toggleViewModal}>User Information</ModalHeader>
                <ModalBody>
                    {currentUser && (
                        <Table striped>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{currentUser.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{currentUser.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>{currentUser.phone}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{currentUser.gender}</td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleViewModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default UsersPanel;