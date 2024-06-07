import React, { useEffect, useState } from "react";
import {
  userId,
  role, 
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable.js";
import { api, authenticateUser } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader.jsx";
import MrnShowModal from "../DetailShowingModal/MrnShowModal";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle.js";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName.js";
import styles from '../../TableModule/TableSticky.module.css';


export default function MR_Represent_Table({status}) {
  const [indents, setIndents] = useState([]);
  const [savedIndents, setSavedIndents] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    async function getIndent() {
      setLoading(true);
      let result = api.post("/get-allindents", { userId, role, userName });
      result = await errorHandler(result);
      setIndents(result.data.data);
      // console.log('all mr',result);
      let response =  api.post("/get-save-userindent", { userId, role, userName })
        response= await errorHandler(response)
        console.log(response)
        if(response.data && response.data.data) setSavedIndents(response.data.data);
      setLoading(false);
    }
    getIndent();
  }, [status]);

  const [showApproved, setShowApproved] = useState('Approved'); // Initially show approved PRs
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const handleModalOpen = (data) => {
    setLoading(true);
    setIsModalOpen(true);
    // console.log(data);
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
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container p-0 mt-3">
      <div
          className="row p-0 m-0 mt-2 mb-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >
        <button className={`btn ${showApproved==="Saved"?'active':""}`} onClick={() => setShowApproved('Saved')}>Show Saved MRs</button>
        <button className={`btn ${showApproved==="Approved"?'active':""}`} onClick={() => setShowApproved('Approved')}>Show Approved MRs</button>
        <button  className={`btn ${showApproved==="Not Approved"?'active':""}`} onClick={() => setShowApproved('Not Approved')}>Show Not Approved MRs</button>
        <button  className={`btn ${showApproved==="Not Approved / Not Recommend"?'active':""}`} onClick={() => setShowApproved('Not Approved / Not Recommend')}>Show Not Recommend MRs</button>
      </div>
      { loading?<Loader/>:<div className="table-responsive">
      <input
            type="text"
            placeholder="Search..."
            className="form-control my-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
       <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
    <div className={`${styles.tableWrapper} col`}>
      <table className={`${styles.table} table`}>
        <thead className={`${styles.stickyHeader} sticky`}>
          <tr>
            <th>MR Number</th>
            <th>MR Status</th>
            <th>Project</th>
            <th>Vendor</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="scrollable-tbody">
          {showApproved === 'Saved'
            ? savedIndents
            .filter((indent) => {
              return (
                (indent.indentId &&
                  indent.indentId
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
                (indent.indentStatus &&
                  indent.indentStatus
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
                    (indent.project &&
                      indent.project
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (indent.vendor &&
                  indent.vendor
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
              );
            })
                .map((indent, key) => (
                  <tr key={key}>
                    <td>{indent.indentId}</td>
                    <td>{indent.indentStatus}</td>
                    <td>{indent.project}</td>
                    <td>{indent.vendor}</td>
                    <td>{formatDate(new Date(indent.indentDate))}</td>
                    <td>
                      <button
                        className="btn btn-link text-left"
                        onClick={() => handleModalOpen(indent)}
                      >
                        More Description
                      </button>
                    </td>
                  </tr>
                ))
            : indents
            .filter((indent) => {
              return (
                (indent.indentId &&
                  indent.indentId
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
                (indent.indentStatus &&
                  indent.indentStatus
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
                    (indent.project &&
                      indent.project
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())) ||
                (indent.vendor &&
                  indent.vendor
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()))
              );
            })
                .map((indent, key) => (
                  <tr key={key}>
                    <td>{indent.indentId}</td>
                    <td>{indent.indentStatus}</td>
                    <td>{indent.project}</td>
                    <td>{indent.vendor}</td>
                    <td>{formatDate(new Date(indent.indentDate))}</td>
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
      </div>
      </div>
      }
      <CustomModal
        size={"large"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Material Requistion Info"}
      >
        <MrnShowModal data={entry} />
      </CustomModal>
    </div>
  );
}
