import React, { useEffect, useState } from "react";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable.js";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import MrnShowModal from "../DetailShowingModal/MrnShowModal";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName.js";
import useGetUserMaterialRequisition from "../../../CommonUtitlites/customHooks/useGetUserMaterialRequisition.js";
import Loader from "../../../CommonUtitlites/Loader/Loader.jsx";
import useGetUserSavedMaterialRequisition from "../../../CommonUtitlites/customHooks/useGetUserSavedMaterialRequisition.js";
export default function MR_Represent_Table({ state }) {
  const [loading, setLoading] = useState(true);
  // console.log("herere")
  const [status, setStatus] = useState(false);
  let indents = useGetUserMaterialRequisition(status, state);
  let savedIndents = useGetUserSavedMaterialRequisition(status, state);
  console.log("first", savedIndents);
  useEffect(() => {
    if (indents) {
      // console.log(indents)

      setLoading(false);
    }
  }, [indents, savedIndents]);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
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
                <th>MR Number</th>
                <th>MR Status</th>
                <th>Project</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="scrollable-tbody">
              {indents
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

              {savedIndents
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
      )}

      <CustomModal
        size={"large"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Material Requistion Info"}
      >
        <MrnShowModal data={entry} setStatus={() => setStatus(!status)} />
      </CustomModal>
    </div>
  );
}
