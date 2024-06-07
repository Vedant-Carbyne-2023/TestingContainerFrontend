import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import ShowIssue from "./ShowIssue";
import Swal from 'sweetalert2';

const Issues = () => {
    const [indents, setIndents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
      async function getIndent() {
        setLoading(true);
        //pr-purchaseorder
        let result = api.post("/get-allIssues", { userId,role, userName });
        result = await errorHandler(result);
        console.log('res',result);
        // console.log('result', result);
        // const filteredData = result.data.data.filter(item => item.isApproved === false);
        // console.log('not approved ones',filteredData);
        // setIndents(filteredData);
        setIndents(result.data.data);
        setLoading(false);
      }
      getIndent();
    }, [toggle]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entry, setModalData] = useState({});
    const handleModalOpen = (data) => {
      setLoading(true);
      setIsModalOpen(true);
      // console.log(data);
      setModalData(data);
      setLoading(false);
    };

    const handleApproval = async (id)=>{
        // console.log('called to approve', userId, role, id);
        let result = api.post("/solve-issue", {userId,role, userName,issueId:id})
        result=await errorHandler(result)
         setToggle(!toggle);
         setIsModalOpen(false)
        //  console.log('toggle is',toggle, id);
        Swal.fire(result.data.message);
        // alert(result.data.message)
      }

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
                    <th style={cellStyle} >ErrorCode</th>
                    <th style={cellStyle} >Message</th>
                    <th style={cellStyle} >Screen Name</th>
                    <th style={cellStyle} >Solved</th>
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
                          {" "} {indent.errorCode}    </button></td>
                          {/* <td style={cellStyle}>{indent.msName}</td> */}
                          {/* <td style={cellStyle}>{indent.errorCode}</td> */}
                        <td style={cellStyle}>{indent.message}</td>
                        <td style={cellStyle}>{ indent.screenName}</td>
                        <td style={cellStyle}>
                        {indent.isSolved?'Solved':'Not Solved'}
                           {/* <button
                               className="btn btn-link text-left"
                               onClick={() => handleApproval(indent._Id)}
                               disabled={indent.isApproved}
                            >
                           Approve
                          </button> */}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            }
            <CustomModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={"Issue Info"}
            //   size={"xl"}
            >
              {/* <p>PR No.: {entry.prId}</p>
              <p>PR Date: {formatDate(new Date(entry.prDate))}</p>
              <p>Project:{entry.projectName}</p>
              <p>Client Name: {entry.clientName}</p>
              <p>Delivery Address: {entry.deliveryAdd}</p>
              <p>Material Description: {entry.materialDesc}</p>
              <p>Quantity: {entry.quantity}</p>
              <p>Unit: {entry.unit}</p>
              <p>Remark: {entry.remark}</p> */}
              {entry && <ShowIssue entry={entry}/>}
            {/* {entry && <ShowPurchaseOrder entry={entry}/>} */}
            {entry && <button
                               className="btn btn-link text-left"
                               onClick={() => handleApproval(entry._id)}
                               disabled={entry.isSolved}
                            >
                           Solve
                          </button>
            }
            </CustomModal>
          </div>
        </>
     );
}
 
export default Issues;