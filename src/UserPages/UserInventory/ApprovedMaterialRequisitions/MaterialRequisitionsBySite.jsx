import React, { useEffect, useState } from "react";
import useGetApprovedMR_ProjectWise from "../../../CommonUtitlites/customHooks/useGetApprovedMR_ProjectWise";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import CustomModalPDF from "../../../CommonUtitlites/ModalPopUpWithPDF/CustomModal";
import MrnShowModal from "../../UserIndent(MR)/DetailShowingModal/MrnShowModal";
import MaterialIssueNoteForm from "../MaterialIssueNotes/MaterialIssueNoteForm";
import MakePdfForMaterialIssueNote from "../MaterialIssueNotes/MakePdfForMaterialIssueNote";
import MiddleWareForPrintIssueNote from "../MaterialIssueNotes/MiddleWareForPrint";
import Loader from "../../../CommonUtitlites/Loader/Loader";

export default function MaterialRequisitionsBySite({projectId, permission}) {

  const { approvedIndent, loading } = useGetApprovedMR_ProjectWise(projectId);
  
  
  // console.log(approvedIndent, projectId)


  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [entry, setModalData] = useState({});


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
                  disabled={!permission}
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

        <MiddleWareForPrintIssueNote data={entry} />

        </CustomModal>
      </div>
      }
    </div>
  );
}
