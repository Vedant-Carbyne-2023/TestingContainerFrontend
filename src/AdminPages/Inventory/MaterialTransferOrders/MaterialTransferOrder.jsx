import React, { useEffect, useState } from "react";
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import { userId, role, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import MtoShowModal from "../../MaterialRequisition/DetailShowingModal/MtoShowModal";
import Loader from "../../../CommonUtitlites/Loader/Loader";

export default function MaterialTransferOrder({projectId}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleModalOpen = (data) => {
    setLoading(true);
    setIsModalOpen(true);
    // console.log(data);
    setModalData(data);
    setLoading(false);
  };
  const [mto, setMto] = useState([])
  
  useEffect(() => {
    async function getMto() {
      setLoading(true);
      let result = api.post("/get-mtoEntryProjectwise", {projectId, userId, role, userName });
      result = await errorHandler(result);
      setMto(result.data.data);
      setLoading(false);
    }
    getMto();
  }, [projectId]);
  // console.log(mto)

  
  const data = [{

    no:"CIPIL/MTO/30934",
    date:"12/07/2023",
    desc:"material 1",
    vendor:"Name Of vendor",
  },{  no:"CIPIL/MTO/30934",
  date:"12/07/2023",
  desc:"material 1",
  vendor:"Name Of vendor",}]


  return (
    <div className="container p-0 mt-3">
      { loading?<Loader/>:<div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th>MTO No.</th>
              <th>MTO Date</th>
              <th>To Gp Name</th>
              <th>Contractor / Person Name</th>
            </tr>
          </thead>
          <tbody>
            {mto.map((item) => (
              <tr key={item.mtoId}>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => handleModalOpen(item)}
                  >
                    {item.mtoId}
                  </button>
                </td>
                <td>{formatDate(new Date(item.mtoDate))}</td>
                <td>{item.transferToGpName }</td>
                <td>{item.mtoContractorName}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"MTO Info"}
          size={"large"}
        >
        <MtoShowModal data={entry}/>
        </CustomModal>
      </div>
      }
    </div>
  );
}
