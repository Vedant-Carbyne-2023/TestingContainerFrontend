import React, { useState } from 'react'
import UserNavbar from './UserNavbar'
import { role } from '../Others/commonExportVariable'
import AdminNavbar from '../AdminNavbar/AdminNavbarC'
import {api} from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';

export default function ChangeEmail() {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const handleFormSubmit = async(event) => {
        event.preventDefault();
        // Add your logic here to handle form submission and password change
        try {
          console.log(mobile,password,newEmail);
          let result = await api.post(
            "/change-email",
            {
              // email: email,
              mobile: mobile,
              password: password,
              newEmail: newEmail,
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
            <h6>Change Email:</h6>
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
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='newEmail' className='form-label'>
              New Email
            </label>
            <input
              type='email'
              className='form-control'
              id='newEmail'
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Change Email
          </button>
        </form>
      </div>


    </div>
  )
}
