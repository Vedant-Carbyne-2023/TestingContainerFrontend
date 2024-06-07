import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../../../CommonUtitlites/Others/formattingDateAndName";
import MaterialRecieptNoteForm from "../../../../Inventory/MaterialReceiptNotes/MaterialRecieptNoteForm";

const RecieptNotes = ({project}) => {
    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);
    const projectId = project.id;
    const [activeComponent, setActiveComponent] = useState("Site MRN");
  const [loading, setLoading] = useState(false);
  
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };


  const [approvedIndent, setApprovedIndent] = useState([])
  useEffect(() => {
    async function getApproved() {
      setLoading(true);
      let result = api.post("/get-getMrnRelatedToProject", { userId, role, userName,projectId });
      result = await errorHandler(result);
      // console.log(result)
      const uniqueApprovedIndent = result.data.data.reduce((uniqueArr, currentItem) => {
        const exists = uniqueArr.some(item => item.mrnsId === currentItem.mrnsId);
        if (!exists) {
          uniqueArr.push(currentItem);
        }
        return uniqueArr;
      }, []);
      setApprovedIndent(uniqueApprovedIndent);
      // setApprovedIndent(result.data.data);
      setLoading(false);
    }
    getApproved();
  }, []);


  console.log(approvedIndent);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setModalData] = useState("")


  const handleModalOpen = (data, type) => {
    setLoading(true);
   setIsModalOpen(true)
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
        <div className="container mt-4">
    { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle}>MRN No.</th>
              <th style={cellStyle}>MRN Date</th>
              <th style={cellStyle}>MRN Status</th>
              <th style={cellStyle}>Project Name</th>
              <th style={cellStyle}>Vendor Name</th>
            </tr>
          </thead>
          <tbody>
            {approvedIndent.map((item) => (
              <tr key={item.mrnsId}>
                <td style={cellStyle}>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MRN')}
                  >
                    {item.mrnsId}
                  </button>
                </td>
                <td style={cellStyle}>{formatDate(new Date(item.mrnDate))}</td>
                <td style={cellStyle}>{item.poId}</td>
                <td style={cellStyle}>{item.projectName}</td>
                <td style={cellStyle}>{item.vendorName}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Material Reciept Note"}
          size={'xl'}
        >
          <MaterialRecieptNoteForm data={data} projectId={projectId} />
        </CustomModal>
        </div>
    }
    </div>
    </>
     );
}
 
export default RecieptNotes;
