import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import Swal from 'sweetalert2';
import ShowPurchaseOrder from "./ShowPurchaseOrder";
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables

const PurchaseOrder = () => {
    const [indents, setIndents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(true);
    const tableRef = useRef(null); // Create a ref for the table element.

    useEffect(() => {
      async function getIndent() {
        setLoading(true);
        //pr-purchaseorder
        let result = api.post("/get-all-poEntry", { userId,role, userName });
        result = await errorHandler(result);
        // console.log('result', result);
        // const filteredData = result.data.data.filter(item => item.isApproved === false);
        // console.log('not approved ones',filteredData);
        // setIndents(filteredData);
        setIndents(result.data.data);
        setLoading(false);
      }
      getIndent();
    }, [toggle]);

    useEffect(() => {
      // Initialize DataTable when the table element is available.
      if (tableRef.current) {
        $(tableRef.current).DataTable();
      }
    }, [indents]); // Trigger DataTable initialization when workOrders change.

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
        let result = api.post("/approve-po", {userId,role, userName,poId:id})
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
            { loading?<Loader/>:<div>
              <table
              ref={tableRef} // Set the ref for the table element. 
              id="myTable" className="display table" style={tableStyle}>
                <thead className="sticky-thead">
                  <tr>
                    <th style={cellStyle} >Purchase Order Number</th>
                    <th style={cellStyle} >Vendor Name</th>
                    <th style={cellStyle} >Project</th>
                    <th style={cellStyle} >Subject</th>
                    <th style={cellStyle} >Date</th>
                    <th style={cellStyle} >Approved</th>
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
                          <td style={cellStyle}>{indent.projectName}</td>
                        <td style={cellStyle}>{indent.subjectOfPo}</td>
                        <td style={cellStyle}>{ formatDate(new Date( indent.poDate))}</td>
                        <td style={cellStyle}>
                        {indent.isApproved?'Approved':'Not Approved'}
                           {/* <button
                               className="btn btn-link text-left"
                               onClick={() => handleApproval(indent.poId)}
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
              title={"Purchase Order Info"}
              size={"xl"}
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
            {entry && <ShowPurchaseOrder entry={entry}/>}
            {entry && <button
                               className="btn btn-link text-left"
                               onClick={() => handleApproval(entry.poId)}
                               disabled={entry.isApproved}
                            >
                           Approve
                          </button>
            }
            </CustomModal>
          </div>
        </>
     );
}
 
export default PurchaseOrder;