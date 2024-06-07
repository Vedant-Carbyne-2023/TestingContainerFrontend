import React, { useEffect, useState } from "react";

import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import MaterialRecieptNoteForm from "./MaterialRecieptNoteForm";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import Loader from "../../../CommonUtitlites/Loader/Loader";

export default function GeneratedPurchaseOrder({projectId}) {



  const [purchaseOrder, setPurchaseOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getApproved() {
      setLoading(true);
      let result = api.post("/get-all-poEntry-by-id", { userId, role, projectId});
      result = await errorHandler(result);
      // console.log(result)
      setPurchaseOrder(result.data.data);
      setLoading(false);
    }
    getApproved();
  }, [projectId]);


  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setModalData] = useState("")


  const handleModalOpen = (data, type) => {
    setLoading(true);
   setIsModalOpen(true)
    setModalData(data);
    setLoading(false);
  };
  

  return (
    <div className="container mt-4">
    { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>Purchase Order No.</th>
              <th>Purchase Order Date</th>
              <th>Purchase Order Status</th>
              <th>Vendor Name</th>
              <th>Make Receipt Note</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrder.map((item) => (
              <tr key={item.poId}>
                <td>
                
                    {item.poId}
            
                </td>
                <td>{formatDate(new Date(item.poDate))}</td>
                <td>{item.poStatus}</td>
                <td>{item.msName}</td>
                <td>
                  
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item, 'MRN')}
                  >
                  Make Receipt Note
                  </button>
                  </td>
              
              </tr>
            ))}
          </tbody>
        </table>
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Material Reciept Note"}
          size={'xl'}
        >
          <MaterialRecieptNoteForm data={data}  projectId={projectId}/>
        </CustomModal>
        </div>
    }
    </div>
  );
}
