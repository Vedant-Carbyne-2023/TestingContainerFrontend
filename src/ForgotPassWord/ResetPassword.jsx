import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../CommonUtitlites/Others/errorHandle';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit';

// import resetPasswordImage from '../path/to/resetPasswordImage.jpg'; // Replace with actual path

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    let result = api.post('/reset-password', { token, password: confirmPassword });
    result = await errorHandler(result);
    alert(result.data.message);
    navigate('/login');
  };

  return (
    <MDBContainer>
      <MDBRow className='justify-content-center align-items-center min-vh-100'>
        <MDBCol md='6'>
          <MDBCard>
            {/* <MDBCardImage src={resetPasswordImage} alt='Reset Password' /> */}
            <MDBCardBody>
              <h2 className='mb-4'>Reset Password</h2>  
              <form onSubmit={handleSubmit}>
                <MDBInput
                  placeholder='New Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBInput
                  placeholder='Confirm Password'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div className='error'>{error}</div>}
                {success && <div className='success'>{success}</div>}
                <MDBBtn type='submit'>Reset Password</MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ResetPassword;
