import React, { useEffect, useState } from "react";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../../CommonUtitlites/Loader/Loader";

export default function ShowApprovedComparisionsForUser(props) {
  // get-quotation-table
  const [comparisions, setComparisions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let result = api.post("/get-all-approved-comparision", { userId, role, userName });
      result = await errorHandler(result);
      console.log(result);
      if (result.data.data) {
        setComparisions(result.data.data);  
      }
      setLoading(false);
    };

    getData();
  }, []);



  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);

  
  const handleComparision = async(id) => {
    setLoading(true);

    // const formData={
    //   comparisionId:id,
    //   selectedVendorsId:comparisions.selectedVendorsId,
    //   isApproved:true
    // }
    // let result = api.post('/edit-comparision-by-id', formData )
    // result=await errorHandler(result)

    let compare = comparisions.find(where => where.comparisionId===id)
    // console.log(compare)
    props.setPrId(compare.prId)
    props.setSelectedVendors(compare.selectedVendorsIds)
    props.setComparisionId(id)

    props.setToggle("Show Approved CS")
    setLoading(false);

  };




  return (
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div className="table-responsive">
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
                     Show Comparision
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }
    
    </div>
  );
}
