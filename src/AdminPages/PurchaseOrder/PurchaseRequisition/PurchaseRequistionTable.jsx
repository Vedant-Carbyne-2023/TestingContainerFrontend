import React, { useEffect, useState } from "react";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import PurchaseRequisitionShow from "./PurchaseRequisitionShow";
import QuotationFormShow from "../GenerateQuotation/QuotationForm";
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import styles from '../../TableModule/TableSticky.module.css';

export default function PurchaseRequistionTable() {
  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function getIndent() {
      setLoading(true);
      let result = api.post("/get-prEntry", { userId,role,userName });
      result = await errorHandler(result);
      console.log(result);
      setIndents(result.data.data);
      setLoading(false);
    }
    getIndent();
  }, []);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [entry, setModalData] = useState({});

  const handleModalOpen1 = (data) => {
    setLoading(true);
    setModalData(data);
    setIsModalOpen1(true);
    setLoading(false);
    // console.log(data);
  };

  const handleModalOpen2 = (data) => {
    setLoading(true);
    setModalData(data);
    setIsModalOpen2(true);
    console.log(data);
    setLoading(false);
  };
  return (
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div className="table-responsive">
      <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
    <div className={`${styles.tableWrapper} col`}>
      <table className={`${styles.table} table`}>
        <thead className={`${styles.stickyHeader} sticky`}>
          <tr>
              <th>Purchase Requistion Number</th>
              <th>Status</th>
              <th>Creator</th>
              <th>Description</th>
              <th>Completion Status</th>
              <th>Generate Quotation</th>
            </tr>
          </thead>
          <tbody>
            {indents &&
              indents?.map((indent) => (
                <tr>
                 
                    <td>  
                  
                    {" "} {indent.prId}   </td>
               
                  <td>{indent.status ? "Approved" : "Not Approved"}</td>
                  <td>{indent.employer}</td>
                  <td><button className="btn"  onClick={() => handleModalOpen1(indent)}>Click For Description</button></td>
                  <td>{indent.prStatus?"Completed":"Not Completed"}</td>
                  <td><button className="btn"  disabled={indent.prStatus} onClick={() => handleModalOpen2(indent)}>Click For Quotation</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      }
      <CustomModal
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
        title={"Purchase Requisition Info"}
       
      >
        <PurchaseRequisitionShow data={entry}/>
        </CustomModal>


      <CustomModal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        title={"Generate Quotation Info"}
  
      >
        <QuotationFormShow data={entry}/>
        </CustomModal>
    </div>
  );
}
