import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import QuotationFormShowModal from "../GenerateQuotationShowModal/QuotationFormModal";

export default function ShowQuotations(props) {
  // get-quotation-table
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let result = api.post("/get-quotation-table", { userId, role });
      result = await errorHandler(result);
      console.log(result);
      if (result.data.data) {
        const uniqueQuotations = filterUniqueQuotations(result.data.data);
        console.log(uniqueQuotations)
        setQuotations(uniqueQuotations);
      }
      setLoading(false);
    };

    getData();
  }, []);

  const filterUniqueQuotations = (quotations) => {
    // Create an object to store unique quotations based on their quotationId
    const uniqueQuotationsMap = {};

    // Loop through the array of quotations
    quotations.forEach((quotation) => {
      // Check if the quotationId already exists in the uniqueQuotationsMap
      if (!uniqueQuotationsMap[quotation.quotationId]) {
        // If it doesn't exist, add the quotation to the uniqueQuotationsMap
        uniqueQuotationsMap[quotation.quotationId] = quotation;
      }
    });

    // Convert the object values back to an array to get the final filtered list
    const uniqueQuotations = Object.values(uniqueQuotationsMap);

    return uniqueQuotations;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);

  
  const handleComparision = (quotation) => {

    props.prId(quotation.prId)
    props.setVendorId(quotation.vendorId)
    props.toggleTo("Comparision Statements")

  };



  const handleOpenModal = async (id) => {
    const getQuotations = async () => {
      setLoading(true);
      try {
        let result = await api.post("/get-single-quotation", {
          userId,
          role,
          quotationId: id,
        });
        result = await errorHandler(result);
        setData(result.data.data);
        setLoading(false);
      } catch (error) {
        // Handle errors appropriately
        console.error("Error fetching quotation:", error);
        setLoading(false);
      }
    };

    // Call the getQuotations function using await
    await getQuotations();

    setIsModalOpen(true);
  };

  return (
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div className="table-responsive">
        <table className="table">
          <thead className="sticky-thead">
            <tr>
              <th>Quotation Number</th>
              <th>Purchase Requisition Number</th>
              <th>Vendor Name</th>
              {
                   props.comparision_permission

                   &&
              <th>Make Compare</th>
}
            </tr>
          </thead>
          <tbody>
            {quotations &&
              quotations?.map((quotation) => (
                <tr>
                  <td>
                    {" "}
                    <button
                      className="btn btn-link text-left"
                      onClick={() => handleOpenModal(quotation.quotationId)}
                    >
                      {" "}
                      {quotation.quotationId}{" "}
                    </button>
                  </td>

                  <td>{quotation.prId}</td>
                  <td>{quotation.vendorName}</td>
                  {
                   props.comparision_permission

                   &&
                  <td>

                    <button
                      className="btn btn-link text-left"
                      onClick={() => handleComparision(quotation)}
                      >
                      Make Comparision
                    </button>
                  </td>
                    }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }
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
