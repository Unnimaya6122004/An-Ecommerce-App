import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import {useAuth} from '../../context/auth'

const AdminDashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout title={'Admin Dashboard - Ecommerce App'} description={'Admin Dashboard'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            {/* Admin Menu Component */}
<AdminMenu/>            
          </div>
          <div className='col-md-9'>
            {/* Content for Admin Dashboard */}
            <h3>Admin Name : {auth?.user?.name}</h3>
            <h3>Admin Email : {auth?.user?.email}</h3>
            <h3>Admin Contact : {auth?.user?.phone}</h3>


          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default AdminDashboard
