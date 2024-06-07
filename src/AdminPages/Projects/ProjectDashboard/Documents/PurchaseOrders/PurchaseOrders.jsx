import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import ShowPurchaseOrder from "./ShowPurchaseOrder";


const PurchaseOrders = ({project}) => {
  

    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);

    const [indents, setIndents] = useState([]);
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getIndent() {
      setLoading(true);
      //pr-purchaseorder
      let result = api.post("/get-all-poEntry-by-id", { projectId:project.id,userId, role, userName});
      result = await errorHandler(result);
      console.log(result);
      console.log('our po data: ',result.data.data);
      setIndents(result.data.data);
      setLoading(false);
    }
    getIndent();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const handleModalOpen = (data) => {
    setLoading(true);
    setIsModalOpen(true);
    console.log(data);
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
          <div className="container p-0 mt-3">
      { loading?<Loader/>:<div className="table-responsive">
        <table className="table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle}>Purchase Order Number</th>
              <th style={cellStyle}>Vendor Name</th>
              <th style={cellStyle}>Subject</th>
              <th style={cellStyle}>Download</th>
              <th style={cellStyle}>Approved</th>
            </tr>
          </thead>
          <tbody>
            {indents &&
              indents?.map((indent) => (
                <tr>
                 
                    <td style={cellStyle}>  <button
                    className="btn btn-link text-left"
                    onClick={() => handleModalOpen(indent)}
                  >
                    {" "} {indent.poId}    </button></td>
               
                  <td style={cellStyle}>{indent.msName}</td>
                  <td style={cellStyle}>{indent.subjectOfPo}</td>
                  <td style={cellStyle} >
                  
                
                    <a href={indent.pdfOfPurchaseOrder}>
                    Download PDF

                    </a>
                  {/* </button> */}
                </td>
                  <td style={cellStyle}>{indent.isApproved ? "Approved" : "Not Approved"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"PO Info"}
        size={"xl"}
      >
      {entry && <ShowPurchaseOrder entry={entry}/>}
      </CustomModal>
    </div>
        </>
     );
}
 
export default PurchaseOrders;