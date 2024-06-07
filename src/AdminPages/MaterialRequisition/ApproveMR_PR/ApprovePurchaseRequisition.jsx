import React, { useEffect, useState } from "react";


import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../CommonUtitlites/Loader/Loader";
// here import modal to show PR
import PRShowModal from "./PRShowModal";
import Swal from 'sweetalert2';

export default function ApprovePurchaseRequisition({setStatus}) {
  const [approveIndent, setApproveIndent] = useState([]);
  const [selectedIndents, setSelectedIndents] = useState([]);

   // our 2 new UseStates
   const [selectedIndentDetails, setSelectedIndentDetails] = useState(null); // State to store the selected item details
   const [isIndentDetailsModalOpen, setIndentDetailsModalOpen] = useState(false);
   const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRecIndent() {
      setLoading(true);
      let result = api.post("/get-pr-notApproved",{role,userId});
      result = await errorHandler(result);
      console.log('not approved pr',result.data)
      setApproveIndent(result.data.data);
      setLoading(false);
    }
    getRecIndent();
  }, [setStatus]);


  const handleApproveModal = async (status)=>{
setStatus(status)
setIndentDetailsModalOpen(false)
  }

  const openIndentDetailsModal = (indent) => {
    console.log('opening a PR',indent);
    setSelectedIndentDetails(indent);
    setIndentDetailsModalOpen(true);
  };
// although it is not used put can pass as a prop
  const closeIndentDetailsModal = () => {
    setSelectedIndentDetails(null);
    setIndentDetailsModalOpen(false);
  };
  console.log(selectedIndents)
  return (
    <>
    { !isIndentDetailsModalOpen &&
      ( loading?<Loader/>:approveIndent.length===0 ? (
        <p>No PR for Approval</p>
      ) : (
      <table className="table">
        <thead className="sticky-thead">
          <tr>
            <th>PR Code</th>
            {/* <th> Purchase Requisition Number</th> */}
            <th>Purchase Requester Name</th>
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
                    id={indent.prId}
                    checked={selectedIndents.includes(indent.prId)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIndents((prevSelected) => [
                          ...prevSelected,
                          indent.prId,
                        ]);
                      } else {
                        setSelectedIndents((prevSelected) =>
                          prevSelected.filter(
                            (selected) => selected !== indent.prId)
                        );
                      }
                    }}
                  />
                </th> */}
                <td><button className="btn" type="button" onClick={() => openIndentDetailsModal(indent)}>{indent.prId}</button></td>
                <td>{indent.employer}</td>
                {/* pR schema don't have indentStatus please look into it */}
                {/* <td>{indent.indentStatus}</td> */}
                <td>{indent.projectName}</td>
                <td>{indent.store}</td>
              </tr>
            ))}
        </tbody>
      </table>
      )
      )
    }
      {isIndentDetailsModalOpen && 
        (
        // here use the imported PR show modal
        // <MrnShowModal
        //   data={selectedIndentDetails}
        //   onSubmitApprove={"Approved"}
        // />
        <PRShowModal 
             data={selectedIndentDetails}
             onSubmitApprove={"Approved"}
             setStatus={(status)=>handleApproveModal(status)}
        />
        )
      }
      {/* <button className="btn float-right" type="button" onClick={handleApprove}>
        Approve Selected Purchase Requisition
      </button> */}
    </>
  );
}