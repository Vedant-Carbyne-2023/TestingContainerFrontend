import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../../../CommonUtitlites/Others/formattingDateAndName";
import MrnShowModal from "../../../../MaterialRequisition/DetailShowingModal/MrnShowModal";


const MRN = ({project}) => {

    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);
    const projectId = project.id;
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [entry, setModalData] = useState({});
    const [approvedIndent, setApprovedIndent] = useState([]);
    const [loading, setLoading] = useState(false);
    
      useEffect(() => {
      
        const fetchData = async () => {
          setLoading(true);
          try {
            let response =  api.post("/get-allprojectindents", { projectId, projectName: project.name ,userId, role, userName })
            response= await errorHandler(response)
            console.log(response)
            if(response.data && response.data.data) setApprovedIndent(response.data.data);
            
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            alert(error.message);
            setLoading(false);
          }
        };
      
        fetchData();
      }, []);
    
    
      const handleModalOpen = (data, type) => {
        if(type === 'MRN'){
          setIsModalOpen1(true)
        }
        else setIsModalOpen2(true)
        setModalData(data);
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

              <th style={cellStyle} >Material Requisition No.</th>
              <th style={cellStyle} >Material Requisition Date</th>
              <th style={cellStyle} >Material Requisition Status</th>
              <th style={cellStyle} >Project Name</th>
              <th style={cellStyle} >Contractor Name</th>

            </tr>
          </thead>
          <tbody>

        {approvedIndent && 
            
            approvedIndent.map((item) => (
              <tr key={item.indentId}>
                <td style={cellStyle}>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MRN')}
                  >
                    {item.indentId}
                  </button>
                </td>
                <td style={cellStyle}>{formatDate(new Date(item.indentDate))}</td>
                <td style={cellStyle}>{item.indentStatus}</td>
                <td style={cellStyle}>{item.project}</td>
                <td style={cellStyle}>{item.vendor}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomModal
          isOpen={isModalOpen1}
          onClose={() => setIsModalOpen1(false)}
          title={"Material Requisition Information"}
          size={'large'}
        >
          <MrnShowModal data={entry} />
        </CustomModal>
      </div>
      }
    </div>
        </>
     );
}
 
export default MRN;
