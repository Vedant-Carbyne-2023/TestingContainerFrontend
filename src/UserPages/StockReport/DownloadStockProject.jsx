import React, { useState } from 'react'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault'
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle'
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from 'sweetalert2'
import { formatDate } from '../../CommonUtitlites/Others/formattingDateAndName'
export default function DownloadStockProject() {
  const [documents, setDocuments] = useState([])
  const handleFetch = async () =>{
    let result = api.post('/listStockReport', {userId,role})
    result = await errorHandler(result)
    setDocuments(result.data.data)
    console.log(result)
  }

  const copyImageUrl = (imageUrl) => {
    // Copy the URL to the clipboard (browser API)
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        Swal.fire({
          title:'Image URL copied to clipboard',
          timer:500
        })
      })
      .catch((error) => {
        console.error('Error copying URL:', error);
      });
  };

  return (
    <div>
      <label>   Download Stock Project </label>
      <button  onClick={()=>handleFetch()} className='btn'>Fetch Stock Report</button>
      <table className="table">
  <thead>
    <tr>
      <th>Document Name</th>
      <th>Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {documents &&
      documents.map((document) => (
        <tr key={document.key}>
          <td>{document.key}</td>
          <td>{formatDate(new Date(document.date))}</td>
          <td>
            <a href={document.link} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Download
            </a>
            <button className="btn ml-3" onClick={() => copyImageUrl(document.link)}>
              <i className="fas fa-paste"></i>
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>


    </div>
  )
}
