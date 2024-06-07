import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import QuotationFormShowModal from "../GenerateQuotationShowModal/QuotationFormModal";
import styles from '../../TableModule/TableSticky.module.css';

export default function ShowComparisions(props) {
  // get-quotation-table
  const [comparisions, setComparisions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let result = api.post("/get-all-comparision", { userId, role,userName });
      result = await errorHandler(result);
      console.log(result);
      if (result.data.data) {
        setComparisions(result.data.data);  
      }
    };

    getData();
  }, []);



  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const [toggle, setToggle] = useState(false)
  
  const handleComparision = async(id) => {

    // const formData={
    //   comparisionId:id,
    //   selectedVendorsId:comparisions.selectedVendorsId,
    //   isApproved:true
    // }
    // let result = api.post('/edit-comparision-by-id', formData )
    // result=await errorHandler(result)

    let compare = comparisions.find(where => where.comparisionId===id)
    props.prId(compare.prId)
    props.selectedVendors(compare.selectedVendorsIds)
    props.comparisionId(id)
    setToggle(!toggle)
    props.toggleTo(toggle)



  };




  return (
    <div className="container p-0 mt-3">
      <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
    <div className={`${styles.tableWrapper} col`}>
      <table className={`${styles.table} table`}>
        <thead className={`${styles.stickyHeader} sticky`}>
          <tr>
              <th>Comparision Number</th>
              <th>Purchase Requisition Number</th>
              <th
              style={{textAlign:'center'}}
              >Approved / Not Approved</th>
              <th
                style={{textAlign:'center'}}
              >Approve Comparision</th>
            </tr>
          </thead>
          <tbody>
            {comparisions &&
              comparisions?.map((quotation) => (
                <tr>
                  <td>
                    {" "}
                  
                      {quotation.comparisionId}{" "}
                  </td>

                  <td>{quotation.prId}</td>
                  <td
                  style={{textAlign:'center'}}
                  >{quotation.isApproved?"Approved":"Not Approved"}</td>
                  <td
                  style={{textAlign:'center'}}
                  >
                    <button
                    disabled={quotation.isApproved}
                      className="btn"
                    
                      onClick={() => handleComparision(quotation.comparisionId)}
                    >
                      {
                        quotation.isApproved?
                        "Approved"
                        :
                      "Approve Comparision"
                      }
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Quotation Info"}
        size={"xl"}
      >
        {data && <QuotationFormShowModal data={data[0]} />}
      </CustomModal>
    </div>
  );
}
