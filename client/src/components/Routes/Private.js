import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function Private() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/user-auth', {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  // Show spinner and redirect if not authenticated
  if (!auth?.token) {
    return <Spinner path="/login" state={{ from: location.pathname }} />;
  }

  // While verifying token
  if (!ok) return <Spinner />;

  // Authorized
  return <Outlet />;
}
