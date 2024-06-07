import React, { useEffect, useState } from "react";
import styles from './ChangeRequests.module.css';
import AdminNavbar from "../../../CommonUtitlites/AdminNavbar/AdminNavbarC";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';

import { authenticateUser } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import {
    userId,
    role, 
    userName,
  } from  "../../../CommonUtitlites/Others/commonExportVariable";
  import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardImage,
  } from 'mdb-react-ui-kit';


export default function ChangeRequests(){
    
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        const authenticateAndFetch = async () => {
          // First useEffect: Authenticate User
          const token = localStorage.getItem('token');
          await authenticateUser(token);
    
          // Second useEffect: Fetch Details
          async function getDetails() {
            setLoading(true);
            console.log('we have', userId, role);
            let allrequests = await api.post(`/get-all-requests`, { userId, role, userName });
            allrequests = await errorHandler(allrequests);
            if (allrequests&&allrequests.data) {
              console.log('all requests', allrequests.data.data);
              setRequests(allrequests.data.data);
            }
            setLoading(false);
          }
          getDetails();
        };
    
        authenticateAndFetch();
      }, [submit]);


const handleEmail = async (data)=>{
  console.log(data)
  // return;
  data.userId=userId
  data.role=role
  data.userName=userName
  let result = api.post('/update-password',data)
  result = await errorHandler(result)
  console.log(result)
  setSubmit(!submit)
}
// 9582515498

    return(
        <>

        {/* all requestss will be shown here */}
        {/* <div className="row  m-0 p-3" style={{ overflow: "auto" }}> */}
      {loading?<Loader/>:requests.length === 0 ? (
        <p>No requests present</p>
      ) : (
        <MDBContainer fluid className="p-0 mt-4 d-flex" style={{
          position: "sticky",
          top: "50rem",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <MDBCol>
        <div className={styles.tableWrapper}>
        <table className={`table table-bordered ${styles.table}`}>
          <thead className={styles.thead}>
            <tr>
              <th >Email</th>
              <th >Role</th>
              <th >Mobile</th>
              <th >Is Approved</th>
              <th >Type</th>
              <th >Make Approved</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td style={{cursor:"initial"}}>{request.email}</td>
                <td style={{cursor:"initial"}}>{request.role}</td>
                <td style={{cursor:"initial"}}>{request.mobile}</td>
                <td style={{cursor:"initial"}}>{request.isApproved ? 'Approved' : 'Not Approved'}</td>
                <td style={{cursor:"initial"}}>{request.type}</td>
                <td style={{cursor:"pointer"}}> 
                   <button disabled={request.isApproved} className="btn" onClick={()=>handleEmail(request)}>
                     Approve Request
                    </button>
                
             </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </MDBCol>
        </MDBContainer>
      )}
    {/* </div> */}
        </>
    )
}