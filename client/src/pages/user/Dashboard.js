import React from 'react';
import Layout from '../../components/Layouts/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layouts/UserMenu';

const Dashboard = () => {
  const { auth } = useAuth(); // ✅ FIXED

  return (
    <Layout title="Dashboard - E-commerce App">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu /> {/* ✅ You can include it here if needed */}
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
