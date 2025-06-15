import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Prefill user data from auth context
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name || '');
      setEmail(email || '');
      setPhone(phone || '');
      setAddress(address || '');
    }
  }, [auth?.user]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      '/api/v1/auth/profile',
      {
        name,
        password,
        phone,
        address,
      },
      {
        headers: {
      Authorization: `Bearer ${auth?.token}`,
        },
      }
    );

    if (data?.success) {
      setAuth({ ...auth, user: data?.updatedUser });
      localStorage.setItem('auth', JSON.stringify({ ...auth, user: data?.updatedUser }));
      toast.success('Profile updated successfully');
    } else {
      toast.error(data?.message);
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong while updating profile');
  }
};


  return (
    <Layout title="User Profile - Ecommerce App" description="View your profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register container mt-4">
              <h1 className="mb-4">User Profile</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    disabled
                    placeholder="Email (not editable)"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
