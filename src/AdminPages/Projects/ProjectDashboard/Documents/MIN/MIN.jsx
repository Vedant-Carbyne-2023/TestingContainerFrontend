import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../../../CommonUtitlites/Others/formattingDateAndName";
import MaterialIssueNoteFormShow from "../../../../Inventory/MaterialIssueNotes/MaterialIssueNoteShow/MaterialIssueNoteFormShow";

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardImage,
  } from 'mdb-react-ui-kit';


const MIN = ({project}) => {

    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);
    const projectId = project.id;
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      try {
        let response =  api.post('/get-min-projectwise',{projectId:projectId, userId, role, userName});
        response= await errorHandler(response)
        console.log(response)
        if(response.data && response.data.data) setData(response.data.data);;
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [projectId]);


  const handleModalOpen = (data) => {
    setLoading(true);
    setIsModalOpen(true);
    console.log(data);
    setModalData(data);
    setLoading(false);
  };

      const tableStyle = {
        border: '1px solid black',
        borderCollapse: 'collapse',
        width: '100%',
      };
      const cellStyle = {
        border: '1px solid black',
      
        padding: '8px',
        textAlign: 'center',
      };

    return ( 
        <>
           <div className="container p-0 mt-3">
      { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle}>Material Issue Note No.</th>
              <th style={cellStyle}>Material Issue Date</th>
              {/* <th>Material Description</th> */}
              <th style={cellStyle}>Contractor / Person Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.minId}>
                <td style={cellStyle}>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item)}
                  >
                    {item.minId}
                  </button>
                </td>
                <td style={cellStyle}>{formatDate(new Date(item.createdAt))}</td>
                {/* <td>{item.desc }</td> */}
                <td style={cellStyle}>{item.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Material Issue Note Info"}
          size={"xl"}
        >
          <MaterialIssueNoteFormShow data={entry} project={projectId}/>

        </CustomModal>
      </div>
      }
    </div>
        </> 
     );
}
 
export default MIN;
