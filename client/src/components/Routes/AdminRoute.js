import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();


  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/admin-auth', {
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

  if (!auth?.token) {
    return <Spinner path="/login" />;
  }

  return ok ? <Outlet /> : <Spinner />;
}
