import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Alert } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { Gift, User, Lock, EyeOff, Eye } from 'lucide-react';
import { authService } from '../data/Service/authService';
import '../styles/christmas-login.css';
import ChristmasParallaxBackground from '../ui/ChristmasParallaxBackground';
import { otpService } from "../data/Service/otpService";

const LoadingEffect = ({ message }) => (
  <div className="flex-col gap-4 w-full flex items-center justify-center">
    <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
      <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full">
      </div>
    </div>
    {message && <p className="text-blue-900 mt-2">{message}</p>}
  </div>
);

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [snowflakes, setSnowflakes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedRememberMe) {
      setCredentials({
        email: storedEmail || '',
        password: storedPassword || ''
      });
      setRememberMe(true);
    }

    const createSnowflakes = () => {
      const newSnowflakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        size: `${Math.random() * 5 + 2}px`,
        delay: `${Math.random() * 5}s`
      }));
      setSnowflakes(newSnowflakes);
    };

    createSnowflakes();
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    setLoadingMessage('Checking credentials, please wait...');

    try {
      const response = await authService.login(credentials.email, credentials.password);
      const userId = response.data._id;
      const enableOTP = response.data.twoFactorEnabled;

      localStorage.setItem('userId', userId);

      localStorage.removeItem('otpVerified');

      if (enableOTP) {
        await otpService.sendOTPVerificationEmail(credentials.email, userId);
        setLoadingMessage(
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                background: 'linear-gradient(to right, #0066ff, #0033cc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                display: 'inline-block', 
              }}
            >
              An OTP has been sent to your email. Please check your inbox.
            </span>
            <p style={{ margin: 0 }}>Redirecting...</p>
          </div>
        );
        setTimeout(() => {
          navigate('/otp-verify');
        }, 1500);
      } else {
        navigate('/home');
      }

      // await otpService.sendOTPVerificationEmail(credentials.email, userId);
      // console.log('Sending OTP to:', credentials.email, 'with User ID:', userId);
      // setSuccess('An OTP has been sent to your email. Please check your inbox.');
      // setTimeout(() => {
      //   navigate('/otp-verify');
      // }, 1500); // Adjust the delay as needed
      // setLoadingMessage('Redirecting to the OTP verification page...');

      // setLoadingMessage('Successful! Redirecting to the Home page...');

      if (rememberMe) {
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('password', credentials.password);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.setItem('rememberMe', 'false');
      }

      // setSuccess('Login successful! Welcome back.');
      // setLoadingMessage('Successful! Redirecting...');

      // setTimeout(() => {
      //   setLoading(false);
      //   navigate('/home');
      // }, 2000);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoading(false);
      setLoadingMessage(''); // Clear loading message
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4 relative overflow-hidden">
      <ChristmasParallaxBackground />

      {loading ? (
        <LoadingEffect message={loadingMessage} />
      ) : (
        // Main Login Card
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md z-10 border-4 border-blue-300"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center items-center mb-4">
              <Gift className="text-blue-600 mr-2" size={40} />
              <h1 className="text-3xl font-bold text-blue-800">Welcome back to TAB!</h1>
            </div>
            <p className="text-blue-600">Santa is not the only one checking in =￣ω￣=</p>
          </div>

          {/* Error and Success Alerts */}
          {error && <Alert color="danger" className="mb-4">{error}</Alert>}
          {success && <Alert color="success" className="mb-4">{success}</Alert>}

          <Form onSubmit={handleClick}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-blue-500" size={20} />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-blue-500" size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="text-blue-600">Remember me</label>
                </div>
                <Link to='/forgot-password' className="text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                Log in
                <Gift className="ml-2" size={20} />
              </button>
            </div>
          </Form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-blue-600">
              Don't have an account?
              <Link to='/register' className="ml-1 hover:underline font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      )}

      {/* Custom Snowflake Animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(50px) rotate(180deg); }
          100% { transform: translateY(0) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;