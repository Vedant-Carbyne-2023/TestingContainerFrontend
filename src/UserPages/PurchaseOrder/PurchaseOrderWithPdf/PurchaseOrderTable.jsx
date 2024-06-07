import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import ShowPurchaseOrder from "./ShowPurchaseOrder";
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables

export default function PurchaseOrderTable() {
  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null); // Create a ref for the table element.

  useEffect(() => {
    async function getIndent() {
      setLoading(true);
      //pr-purchaseorder
      let result = api.post("/get-all-poEntry", { userId, role, userName});
      result = await errorHandler(result);
      console.log(result);
      setIndents(result.data.data);
      setLoading(false);
    }
    getIndent();
  }, []);

  useEffect(() => {
    // Initialize DataTable when the table element is available.
    if (tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [indents]); // Trigger DataTable initialization when workOrders change.

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const handleModalOpen = (data) => {
    // setLoading(true);
    setIsModalOpen(true);
    console.log(data);
    setModalData(data);
    // setLoading(false);
  };

  const sendEmail = async(id) => {
    console.log('tried sending mail', id);
    // getting Internal server Error on calling this api
    let result = api.post('/purchaseOrder-sendEmail', {userId, role, userName, poId:id})
    result = await errorHandler(result)
    console.log(result)
    if(result&& result.data){
      Swal.fire({
        icon:"success",
        title:"Successfully Email Sent",
        message:result.data.message
      })
    }
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
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div>
        <table
        ref={tableRef} // Set the ref for the table element. 
        id="myTable" className="display table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle} >Purchase Order Number</th>
              <th style={cellStyle} >Vendor Name</th>
              <th style={cellStyle} >Subject</th>
              <th style={cellStyle} >Purchase Order Status</th>
              <th style={cellStyle} >Download Pdf</th>
              <th style={cellStyle} >Send Email</th>
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
                  <td style={cellStyle}>{indent.orderStatus}</td>

                  <td style={cellStyle} >
                  {/* <button
                    className="btn btn-link text-left"
                    onClick={() => handleComparision(quotation.prId)}
                  > */}
                
                    <a href={indent.pdfOfPurchaseOrder}>
                    Download PDF

                    </a>
                  {/* </button> */}
                </td>

                  <td style={cellStyle}>
                  {indent.isApproved ? (
                  <button
                    className="btn btn-link text-left"
                    onClick={() => sendEmail(indent.poId)}
                    disabled={indent.contactPersonEmail===""}
                  >
                    {/* Button content */}
                    Send
                  </button>
                ) : (
                  <span>Not approved</span>
                )}
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
        title={"PO Info"}
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
        {/* <p>Rate: {entry.rate}</p>
<p>Tax Rate: {entry.taxRate}</p>
<p>Discount: {entry.discount}</p>
<p>Total: {entry.total}</p> */}
           {entry && <ShowPurchaseOrder entry={entry}/>}
      </CustomModal>
    </div>
  );
}
