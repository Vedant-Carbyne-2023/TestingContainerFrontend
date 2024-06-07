import React, { useEffect, useState } from "react";


import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import MrnShowModal from "../DetailShowingModal/MrnShowModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';

export default function ApproveMaterialRequisition({setStatus}) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [approveIndent, setApproveIndent] = useState([]);
  const [selectedIndents, setSelectedIndents] = useState([]);
  // our 2 new UseStates
  const [selectedIndentDetails, setSelectedIndentDetails] = useState(null); // State to store the selected item details
  const [isIndentDetailsModalOpen, setIndentDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRecIndent() {
      let result = api.post("/get-appindent",{role,userId, userName});
      setLoading(true);
      result = await errorHandler(result);
      setApproveIndent(result.data.data);
      setLoading(false);
    }
    getRecIndent();
  }, []);


  // const handleApprove = async ()=>{
  //   selectedIndents?.map( async(indentId) =>
  //     {
  //     let result = api.patch('/edit-indent', {indentId:indentId, status:"Approved", userId, role})
  //     result = await errorHandler(result)
  //     console.log(result)
  //       alert(result.data.message)
  //   }
  //     )
  // }
  const openIndentDetailsModal = (indent) => {
    setSelectedIndentDetails(indent);
    setIndentDetailsModalOpen(true);
  };
// although it is not used put can pass as a prop
  const closeIndentDetailsModal = () => {
    setSelectedIndentDetails(null);
    setIndentDetailsModalOpen(false);
  };
  const handleApprove = async ()=>{
    selectedIndents?.map( async(indentId) =>
      {
      let result = api.patch('/edit-indent', {indentId:indentId, status:"Approved", userId, role, userName})
      result = await errorHandler(result)
      // console.log(result)
      Swal.fire(result.data.message);
        // alert(result.data.message)
    }
      )
  }
  return (
    <>
    { !isIndentDetailsModalOpen &&
      ( loading?<Loader/>:approveIndent.length===0 ? (
        <p>No MR for Approval</p>
      ) : (
      <table className="table">
        <thead className="sticky-thead">
          <tr>
            <th>MR Code</th>
            <th> Material Requisition Number</th>
            <th>Material Requisition Status</th>
            <th>Project</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{ position:'sticky',  overflow:"auto"}}>
         
          {approveIndent &&
            approveIndent?.map((indent) => (
              <tr>
                {/* <th>
                  <input
                    type="checkbox"
                    id={indent.indentId}
                    checked={selectedIndents.includes(indent.indentId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIndents((prevSelected) => [
                          ...prevSelected,
                          indent.indentId,
                        ]);
                      } else {
                        setSelectedIndents((prevSelected) =>
                          prevSelected.filter(
                            (selected) => selected !== indent.indentId)
                        );
                      }
                    }}
                  />
                </th> */}
                <td><button className="btn" type="button" onClick={() => openIndentDetailsModal(indent)}>{indent.indentId}</button></td>
                <td>{indent.vendor}</td>
                <td>{indent.indentStatus}</td>
                <td>{indent.project}</td>
                <td>{indent.store}</td>
              </tr>
            ))}
        </tbody>
      </table>
      )
      )
      }
      {isIndentDetailsModalOpen && (
        <MrnShowModal
          data={selectedIndentDetails}
          onSubmitApprove={"Approved"}
          setStatus={(status)=>setStatus(status)}
        />
      )}
      {/* <button className="btn float-right" type="button" onClick={handleApprove}>
        Approve Selected Material Requisition
      </button> */}
    </>
  );
}
