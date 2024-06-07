import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import { role } from '../Others/commonExportVariable'
import AdminNavbar from '../AdminNavbar/AdminNavbarC'
import {api} from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';

export default function ChangePassword() {
    const [mobile, setMobile] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
  
    const handleFormSubmit = async(event) => {
      event.preventDefault();
      // Add your logic here to handle form submission and password change
      try {
        console.log(mobile,oldPassword,newPassword);
        let result = await api.post(
          "/change-password",
          {
            // email: email,
            mobile: mobile,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }
        );
        result = await errorHandler(result);
        console.log(result);
        if(result&&result.data){
            alert(result.data.message);
        }
      } catch (error) {
        if (error && error.response && error.response.data) {
          alert(error.response.data.message);
        }
      }
    };
  return (
    <div>
        {/* {
           

            role === 'SuperUser'?
            <AdminNavbar />:

            <UserNavbar/>
                
        } */}

        <div className='title'>
            <h6>Change Password:</h6>
        </div>
        <div className='col-md-6 mx-auto'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3'>
            <label htmlFor='mobile' className='form-label'>
              Mobile Number
            </label>
            <input
              type='text'
              className='form-control'
              id='mobile'
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='oldPassword' className='form-label'>
              Old Password
            </label>
            <input
              type='password'
              className='form-control'
              id='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='newPassword' className='form-label'>
              New Password
            </label>
            <input
              type='password'
              className='form-control'
              id='newPassword'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Change Password
          </button>
        </form>
      </div>


    </div>
  )
}
