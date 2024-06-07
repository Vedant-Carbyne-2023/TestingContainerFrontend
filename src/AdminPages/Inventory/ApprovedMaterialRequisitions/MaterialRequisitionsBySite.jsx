import React, { useEffect, useState } from "react";
import useGetApprovedMR_ProjectWise from "../../../CommonUtitlites/customHooks/useGetApprovedMR_ProjectWise";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import CustomModalPDF from "../../../CommonUtitlites/ModalPopUpWithPDF/CustomModal";
import MaterialIssueNoteForm from "../MaterialIssueNotes/MaterialIssueNoteForm";
import MrnShowModal from "../../MaterialRequisition/DetailShowingModal/MrnShowModal";
import useGetApprovedMaterialRequisition from "../../../CommonUtitlites/customHooks/useGetApprovedMaterialRequisition";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable';
import Loader from '../../../CommonUtitlites/Loader/Loader';
import Swal from 'sweetalert2';

export default function MaterialRequisitionsBySite({projectId}) {
  console.log('id',projectId);



  // let approvedIndent =  useGetApprovedMaterialRequisition()
  
  // console.log(approvedIndent, projectId)


  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [entry, setModalData] = useState({});
  const [approvedIndent, setApprovedIndent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      try {
        // let response =  api.post("/get-approved", { userId, role, userName })
        let response =  api.post("/get-approved-projectwise", { projectId,userId, role, userName })
        response= await errorHandler(response);
        // console.log(response);
        if(response.data && response.data.data) setApprovedIndent(response.data.data);
        
        setLoading(false);
      } catch (error) {
        // console.error('Error fetching data:', error);
        Swal.fire(error.message);
        alert(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [projectId]);


  const handleModalOpen = (data, type) => {
    if(type === 'MRN'){
      setIsModalOpen1(true)
    }
    else setIsModalOpen2(true)
    setModalData(data);
  };


  return (
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>

              <th>Material Requisition No.</th>
              <th>Material Requisition Date</th>
              <th>Material Requisition Status</th>
              <th>Project Name</th>
              <th>Contractor Name</th>
              <th>Generate Material Issue Note</th>

            </tr>
          </thead>
          <tbody>

        {approvedIndent && 
            
            approvedIndent.map((item) => (
              <tr key={item.indentId}>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MRN')}
                  >
                    {item.indentId}
                  </button>
                </td>
                <td>{formatDate(new Date(item.indentDate))}</td>
                <td>{item.indentStatus}</td>
                <td>{item.project}</td>
                <td>{item.vendor}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MTO')}
                  >
                    Click For MIN
                  </button>
                </td>
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

        <CustomModal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          title={"Material Issue Note Generation"}
          size={'xl'}
        >

        <MaterialIssueNoteForm data={entry} project={projectId} />

        </CustomModal>
      </div>
      }
    </div>
  );
}
