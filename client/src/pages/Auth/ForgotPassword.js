
import React, { useState } from 'react';
import Layout from "../../components/Layouts/Layout.js";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/AuthStyles.css'; // ✅ Import your CSS file for styling

const ForgotPassword = () => {
      const [email, setEmail] = useState('');
      const [newPassword, setNewPassword] = useState('');
      const [answer, setAnswer] = useState(''); // ✅ Add this line
 // ✅ Add this line
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            '/api/v1/auth/forgot-password', // ✅ Endpoint should be /login not /register
            { email, newPassword,answer }
          );
    
          if (res && res.data.success) {
      toast.success(res.data.message);
        // Update context
    
    
    
      navigate('/login');
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
    <Layout title="Forgot Password - E-commerce App">
     <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Password</h4>
          <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          /></div>
           <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your favourite Sport Name"
            required
          /></div>
          <div className="mb-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          /></div>
         
          <button type="submit"className='btn btn-primary'>RESET</button>

        </form>
      </div>      
    </Layout>
  )
}

export default ForgotPassword
