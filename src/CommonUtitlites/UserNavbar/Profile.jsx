import React from 'react'
import UserNavbar from './UserNavbar'
import { role,userName } from '../Others/commonExportVariable'
import AdminNavbar from '../AdminNavbar/AdminNavbarC'

export default function Profile() {
  return (
    <div>
        {/* {
           

            role === 'SuperUser'?
            <AdminNavbar />:

            <UserNavbar/>
                
        } */}

        <div className='title'>
            <h6>Profile</h6>
        </div>
        <div className='col-md-12 mx-auto' >
            
           <h6> Name : {userName}</h6>
           <h6> Role : {role}</h6>
        </div>


    </div>
  )
}
