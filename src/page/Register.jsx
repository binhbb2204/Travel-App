import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Form, FormGroup, Button, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { Gift, User, Lock, Mail, Eye, EyeOff, Phone } from 'lucide-react';
import { authService } from '../data/Service/authService';
import { useUsers } from "./admin/UsersContext";
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import '../styles/christmas-register.css';

const Register = () => {
  const { addUser } = useUsers();

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    setError(null);
    setSuccess(null);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    // Validation checks
    const validationErrors = [];
  
    // Name validation
    if (formData.name.length < 2) {
      validationErrors.push("Name must be at least 2 characters long");
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      validationErrors.push("Please enter a valid email address");
    }
  
    // Phone validation
    const phoneRegex = /^[0-9]{10}$/; // Assumes 10-digit phone number
    if (!phoneRegex.test(formData.phone)) {
      validationErrors.push("Phone number must be 10 digits long");
    }
  
    if (formData.password.length < 8) {
      validationErrors.push("Password must be at least 8 characters long");
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      validationErrors.push("Password must include uppercase, lowercase, number, and special character");
    }
  
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push("Passwords do not match");
    }
  
    if (!formData.gender) {
      validationErrors.push("Please select a gender");
    }
  
    if (validationErrors.length > 0) {
      setError(validationErrors.join(". "));
      return;
    }
  
    try {
      const response = await authService.register(formData)
      setSuccess(response.message || 'Registration successful');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      setFormData({
        name: '',
        gender: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error registering user:', error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError(error.response.data.message || 'Invalid registration details');
            break;
          case 409:
            setError('Email already exists. Please use a different email.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('Registration failed. Please try again.');
        }
      } else if (error.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred during registration.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <ChristmasParallaxBackground/>

      {/* Main Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 border-4 border-blue-300 mt-14"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center items-center mb-4">
            <Gift className="text-blue-600 mr-2" size={40} />
            <h1 className="text-3xl font-bold text-blue-800">Create Account</h1>
          </div>
          <p className="text-blue-600">TAB into the Holiday Spirit!</p>
        </div>

        {/* Error and Success Alerts */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert color="danger" className="mb-4">{error}</Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert color="success" className="mb-4">{success}</Alert>
          </motion.div>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-blue-500" size={20} />
              </div>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
            </div>

            {/* Gender Select */}
            <div className="relative">
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-gray-700"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-blue-500" size={20} />
              </div>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="text-blue-500" size={20} />
              </div>
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-blue-500" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-blue-500" size={20} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <Gift className="mr-2" size={20} />
              Create Account
            </motion.button>
          </div>
        </Form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-blue-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-blue-800 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;