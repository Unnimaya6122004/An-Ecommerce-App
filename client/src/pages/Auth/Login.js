import React, { useState } from 'react';
import Layout from "../../components/Layouts/Layout.js";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../styles/AuthStyles.css'; // ✅ Import your CSS file for styling
import { useAuth } from '../../context/auth'; // ✅ Import useAuth to access authentication context
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // ✅ Add this line
  const {setAuth} = useAuth(); // ✅ Use setAuth to update authentication context
  
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Use useLocation to get the current location

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/v1/auth/login', // ✅ Endpoint should be /login not /register
        { email, password }
      );

      if (res && res.data.success) {
  toast.success(res.data.message);
    // Update context
  setAuth({
    user: res.data.user,
    token: res.data.token,
  });

  // Save to localStorage
  localStorage.setItem('auth', JSON.stringify(res.data));

  navigate(location.state || '/');
}
 else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again later.");
    }
  };

  return (
    <Layout title="Login - E-commerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="title">Login</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div className="mb-3">
                      <button type="button"className='btn btn-primary' onClick={()=>{navigate('/forgot-password')}}>Forgot Password ?</button>
          </div>
          <button type="submit"className='btn btn-primary'>Login</button>

        </form>
      </div>
    </Layout>
  );
};

export default Login;
