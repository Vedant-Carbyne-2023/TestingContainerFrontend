import React, { useState, useEffect } from 'react';
import {
    role,
    userId,
    userName,
  } from "../../CommonUtitlites/Others/commonExportVariable";
  import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
  import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
  import Loader from '../../CommonUtitlites/Loader/Loader';
import createPDFForGrn from './MakePdfForGRN';

export default function GrnTable() {
    const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function getIndent() {
      setLoading(true);
      let result = api.post("/get-grnEntry", { userId,role, userName });
      result = await errorHandler(result);
      // console.log(result);
      setIndents(result.data.data);
      setLoading(false);
    }
    getIndent();
  }, []);

  const handleClickDownload = async (grn) =>{

    console.log(grn)
    // let result = api.post('/get-single-min',{userId,userName,role, minId})
    // result = await errorHandler(result)
    let pdf = await createPDFForGrn({data:grn,tableData:grn.items})
    // console.log(result)
    // // alert(result.data.message)
    Swal.fire({
      timer:2000,
      icon:'success',
      title:result.data.message
    })
  
  }

  
  return (
    <>
  { loading?<Loader/>:
  (
    <div className="table-container mt-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
    <table className="table">
      <thead className="sticky-thead">
        <tr>
          <th>GRN Number</th>
          <th>MR Number</th>
          <th>Project</th>
          <th>Location</th>
          <th>Contractor Name</th>
          <th>Download PDF</th>
        </tr>
      </thead>
      <tbody>
        {indents &&
          indents.map((indent, index) => (
            <tr key={index}>
              <td>{indent.grnId}</td>
              <td>{indent.mrNo}</td>
              <td>{indent.projectName}</td>
              <td>{indent.location}</td>
              <td>{indent.contractorName}</td>
              <td>
                <button className="btn" onClick={() => handleClickDownload(indent)}>
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  
    )
  }
   </>
  )
}
