import React, { useEffect, useState } from "react";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";
import QuotationFormShowModal from "../GenerateQuotationShowModal/QuotationFormModal";

export default function ShowApprovedComparisions(props) {
  // get-quotation-table
  const [comparisions, setComparisions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let result = api.post("/get-all-comparision", { userId, role, userName });
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

    props.toggleTo("Comparision Statements For Approval")



  };




  return (
    <div className="container p-0 mt-3">
      <div className="table-responsive">
        <table className="table">
          <thead className="sticky-thead">
            <tr>
              <th>Comparision Number</th>
              <th>Purchase Requisition Number</th>
              <th>Approved / Not Approved</th>
              <th>Show Comparision</th>
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
                  <td>{quotation.isApproved?"Approved":"Not Approved"}</td>
                  <td>
                    <button
                      className="btn btn-link text-left"
                      onClick={() => handleComparision(quotation.comparisionId)}
                    >
                      Make Purchase Order
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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
