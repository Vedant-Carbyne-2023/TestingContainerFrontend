import React, { useEffect, useState } from "react";
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import MrnShowModal from "../DetailShowingModal/MrnShowModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';


export default function RecommendMaterialRequisition({setStatus}) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [recommandIndent, setRecommandIndent] = useState([]);
  // our 2 new UseStates
  const [selectedIndentDetails, setSelectedIndentDetails] = useState(null); // State to store the selected item details
  const [isIndentDetailsModalOpen, setIndentDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecIndent() {
      setLoading(true);
      let result = api.post("/get-recindent", {role, userId, userName});
      result = await errorHandler(result);
      setRecommandIndent(result.data.data);
      setLoading(false);
    }
    getRecIndent();
  }, []);

  const [selectedIndents, setSelectedIndents] = useState([]);
 
  // const handleRecommend = async ()=>{
  //   selectedIndents?.map( async(indentId) =>
  //     {
  //     let result = api.patch('/edit-indent', {indentId:indentId, userId,role, userName, status:"Not Approved"})
  //     result = await errorHandler(result)
  //     Swal.fire(result.data.message);
  //     // alert(result.data.message)
  //   }
  //     )
  // }
  const openIndentDetailsModal = (indent) => {
    setSelectedIndentDetails(indent);
    setIndentDetailsModalOpen(true);
  };

  return (
    <>
    { !isIndentDetailsModalOpen && (
      loading?<Loader/>:recommandIndent.length===0 ? (
        <p>No MR for Recommendation</p>
      ) : (
      <table className="table ">
        <thead className="sticky-thead" >
          <tr>
            <th>MR Code</th>
            <th> Material Requisition Number</th>
            <th>Material Requisition Status</th>
            <th>Project</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{ position:'sticky',  overflow:"auto"}}>
          {recommandIndent &&
            recommandIndent?.map((indent) => (
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
                            (selected) => selected !== indent.indentId
                          )
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
      )}
      {/* <button className="btn float-right" type="button" onClick={handleRecommend}>
        Recommend Material Requisition
      </button> */}
      {/* <IndentDetailsModal
        isOpen={isIndentDetailsModalOpen}
        onClose={closeIndentDetailsModal}
        indent={selectedIndentDetails}
      /> */}
      {isIndentDetailsModalOpen && (
        <MrnShowModal
          data={selectedIndentDetails}
          onSubmitRecommend={"Not Approved"}
          setStatus={(status)=>setStatus(status)}
        />
      )}
    {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      {/* <table className="table ">
        <thead className="sticky-thead" >
          <tr>
            <th></th>
            <th> Material Requisition Number</th>
            <th>Material Requisition Status</th>
            <th>Project</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody style={{ position:'sticky',  overflow:"auto"}}>
          {recommandIndent &&
            recommandIndent?.map((indent) => (
              <tr>
                <th>
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
                            (selected) => selected !== indent.indentId
                          )
                        );
                      }
                    }}
                  />
                </th>
                <td>{indent.indentId}</td>
                <td>{indent.indentStatus}</td>
                <td>{indent.project}</td>
                <td>{indent.store}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn float-right" type="button" onClick={handleRecommend}>
        Recommend Material Requisition
      </button> */}
    </>
  );
}
