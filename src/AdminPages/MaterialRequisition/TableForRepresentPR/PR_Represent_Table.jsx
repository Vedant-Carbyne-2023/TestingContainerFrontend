import React, { useEffect, useState } from "react";
import {
  userId,
  role, 
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable.js";
import { api, authenticateUser } from "../../../CommonUtitlites/AxiosSetup/axiosDefault.js";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal.jsx";
import MrnShowModal from "../DetailShowingModal/MrnShowModal.jsx";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle.js";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName.js";
import useGetUserMaterialRequisition from "../../../CommonUtitlites/customHooks/useGetUserMaterialRequisition.js";
import Loader from "../../../CommonUtitlites/Loader/Loader.jsx";
import useGetUserPurchaseRequisition from "../../../CommonUtitlites/customHooks/useGetUserPurchaseRequisition.js";
import PRShowModal from "../ApproveMR_PR/PRShowModal.jsx";
import useGetUserSavedPurchaseRequisition from "../../../CommonUtitlites/customHooks/useGetUserSavedPurchaseRequisition.js";
export default function PR_Represent_Table({state}) {
  const [status, setStatus] = useState(false)

  const [loading, setLoading] = useState(true);
  let indents = useGetUserPurchaseRequisition(state);
  let savedIndents = useGetUserSavedPurchaseRequisition(state, status);
  // console.log('first',indents,loading);
  useEffect(() => {
    if(indents){
      setLoading(false);
    }
  }, [indents]);
  const [showApproved, setShowApproved] = useState('Approved'); // Initially show approved PRs

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const handleModalOpen = (data) => {
    setIsModalOpen(true);
    // console.log(data);
    setModalData(data);
  };
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="container p-0 mt-3">
      {/* <div style={{ textAlign: 'center' }}> */}
      <div
          className="row p-0 m-0 mt-2 mb-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >
          <button
    className={`btn ${showApproved === 'Saved' ? 'active' : ""} mr-2`}
    onClick={() => setShowApproved('Saved')}
  >
    Show Saved PRs
  </button>
  <button
    className={`btn ${showApproved === 'Approved' ? 'active' : ""} mr-2`}
    onClick={() => setShowApproved('Approved')}
  >
    Show Approved PRs
  </button>
  <button
    className={`btn ${showApproved === 'Not Approved' ? 'active' : ""} ml-2`}
    onClick={() => setShowApproved('Not Approved')}
  >
    Show Not Approved PRs
  </button>
      </div>
      { loading?<Loader/>:<div className="table-responsive">

        
        <input
            type="text"
            placeholder="Search..."
            className="form-control my-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        <table className="table">

          <thead className="sticky-thead">
            <tr>
              <th>PR Number</th>
              <th>PR Status</th>
              {showApproved==="Saved"&&<th>Prepared By</th>}
              <th>Project</th>
              {/* <th>Vendor</th> */}
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
          {savedIndents &&
                savedIndents
                  .filter((indent) => {
                    return (
                      ((indent.prId &&
                        indent.prId
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) ||
                        (indent.description &&
                          indent.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))) &&
                      indent.status &&
                      indent.status === "Saved" &&
                      showApproved === "Saved"
                    );
                  })
                  .map((indent, key) => (
                    <tr key={key}>
                      <td>{indent.prId}</td>
                      <td>{indent.status}</td>
                      <td>{indent.preparedBy}</td>
                      <td>{indent.projectName}</td>
                      {/* <td>{indent.vendor}</td> */}
                      <td>{formatDate(new Date(indent.prDate))}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-link text-left"
                          onClick={() => handleModalOpen(indent)}
                        >
                          More Description
                        </button>
                      </td>
                    </tr>
                  ))}
              {indents &&
                indents
                  .filter((indent) => {
                    return (
                      (((indent.prId &&
                        indent.prId
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) ||
                        (indent.description &&
                          indent.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))) &&
                        indent.status &&
                        indent.status === true &&
                        showApproved === "Approved") ||
                      (indent.status &&
                        indent.status === false &&
                        showApproved === "Not Approved")
                    );
                  })
                  .map((indent, key) => (
                    <tr key={key}>
                      <td>{indent.prId}</td>
                      <td>
                        {indent.status
                          ? "Approved (Sent To Purchase Department)"
                          : "Not Approved"}
                      </td>
                      <td>{indent.projectName}</td>
                      {/* <td>{indent.vendor}</td> */}
                      <td>{formatDate(new Date(indent.prDate))}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-link text-left"
                          onClick={() => handleModalOpen(indent)}
                        >
                          More Description
                        </button>
                      </td>
                    </tr>
                  ))}
              {indents &&
                indents
                  .filter((indent) => {
                    return (
                      ((indent.prId &&
                        indent.prId
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())) ||
                        (indent.description &&
                          indent.description
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))) &&
                      indent.status === false &&
                      showApproved === "Not Approved"
                    );
                  })
                  .map((indent, key) => (
                    <tr key={key}>
                      <td>{indent.prId}</td>
                      <td>
                        {indent.status
                          ? "Approved (Sent To Purchase Department)"
                          : "Not Approved"}
                      </td>
                      <td>{indent.projectName}</td>
                      {/* <td>{indent.vendor}</td> */}
                      <td>{formatDate(new Date(indent.prDate))}</td>
                      <td>
                        <button
                          className="btn btn-link text-left"
                          onClick={() => handleModalOpen(indent)}
                        >
                          More Description
                        </button>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
      }
      <CustomModal
        size={"large"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Purchase Requistion Info"}
      >
        <PRShowModal data={entry} setStatus={(data)=>setStatus(data)}/>
      </CustomModal>
    </div>
  );
}
