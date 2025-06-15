import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'

const Users = () => {
  return (
    <Layout title={'All Users - Ecommerce App'} description={'Admin Dashboard'}>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
      
    </div>
        <div className='col-md-9'>
            <h1>All Users</h1>
            {/* Here you can map through the users and display them */}
            {/* Example: */}
            {/* {users.map(user => (
                <div key={user._id}>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
            ))} */}
        </div>
    </div>
    </div>

    </Layout>
  )
}

export default Users
