import React, { useEffect, useState } from "react";

import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import MaterialRecieptNoteForm from "./MaterialRecieptNoteForm";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {userId, userName, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import createPDFforMaterialReceiptNote from "../GeneratedPurchaseOrder/MakePdfForMaterialReceiptNote";
import Swal from "sweetalert2";


export default function MaterialRecieptNote({projectId}) {
  console.log('projectId',projectId);
  const [activeComponent, setActiveComponent] = useState("Site MRN");
  const [loading, setLoading] = useState(false);
  
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };


  const [approvedIndent, setApprovedIndent] = useState([])
  useEffect(() => {
    async function getApproved() {
      setLoading(true);
      let result = api.post("/get-getMrnRelatedToProject", { userId, role, projectId });
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
      setLoading(false);
    }
    getApproved();
  }, [projectId]);


  // console.log(approvedIndent);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setModalData] = useState("")


  const handleModalOpen = (data, type) => {
   setIsModalOpen(true)
    setModalData(data);
  };
  
  const handleClickDownload = async (mrnId) =>{
    let result = api.post('/get-singleMrn-by-mrnId',{userId,userName,role, mrnId})
    result = await errorHandler(result)
    let pdf = await createPDFforMaterialReceiptNote({data:result.data.data,tableData:result.data.tableData,billingAddress:result.data.data.company})
    console.log(result)
    // alert(result.data.message)
    Swal.fire({
      timer:2000,
      icon:'success',
      title:result.data.message
    })

  }

  return (
    <div className="container mt-4">
    { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>MRN No.</th>
              <th>MRN Date</th>
              <th>MRN Status</th>
              <th>Project Name</th>
              <th>Vendor Name</th>
              <th>Download PDF </th>
            </tr>
          </thead>
          <tbody>
            {approvedIndent.map((item) => (
              <tr key={item.mrnsId}>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MRN')}
                  >
                    {item.mrnsId}
                  </button>
                </td>
                <td>{formatDate(new Date(item.mrnDate))}</td>
                <td>{item.poId}</td>
                <td>{item.projectName}</td>
                <td>{item.vendorName}</td>
                <td>
                  <button className="btn" onClick={()=>handleClickDownload(item.mrnsId)}>Download PDF </button>
                  </td>
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
  );
}
