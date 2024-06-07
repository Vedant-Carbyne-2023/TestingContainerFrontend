import React, { useEffect, useState } from "react";
import MaterialIssueNoteForm from "./MaterialIssueNoteForm";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import useGetMaterialIssueNotesProjectWise from "../../../CommonUtitlites/customHooks/useGetMaterialIssueNotesProjectWise";
import MaterialIssueNoteFormShow from "./MaterialIssueNoteShow/MaterialIssueNoteFormShow";
import Loader from "../../../CommonUtitlites/Loader/Loader"
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import createPDF from "./MakePdfForMaterialIssueNote";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, userName, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";
export default function MaterialIssueNotes ({projectId}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});


  const handleModalOpen = (data) => {
    setIsModalOpen(true);
    // console.log(data);
    setModalData(data);
  };


  const { data, loading } = useGetMaterialIssueNotesProjectWise(projectId)
  // console.log('check:',data,loading);
  console.log(wastedInventory)
  // useEffect(() => {
  //   if(data){
  //     setLoading(false);
  //   }
  // }, [data]);
  const handleClickDownload = async (minId) =>{
    let result = api.post('/get-single-min',{userId,userName,role, minId})
    result = await errorHandler(result)
    let pdf = await createPDF({data:result.data.data,tableData:result.data.tableData,billingAddress:result.data.data.block})
    console.log(result)
    // alert(result.data.message)
    Swal.fire({
      timer:2000,
      icon:'success',
      title:result.data.message
    })

  }


  return (
    <div className="container p-0 mt-3">
       { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Material Issue Note No.</th>
              <th>Material Issue Date</th>
              {/* <th>Material Description</th> */}
              <th>Contractor / Person Name</th>
              <th>Download PDF</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.minId}>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item)}
                  >
                    {item.minId}
                  </button>
                </td>
                <td>{formatDate(new Date(item.createdAt))}</td>
                {/* <td>{item.desc }</td> */}
                <td>{item.vendor}</td>
                <td>
                  <button className="btn" onClick={()=>handleClickDownload(item.minId)}>Download PDF Of MIN </button>
                  </td>
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
  );
}
