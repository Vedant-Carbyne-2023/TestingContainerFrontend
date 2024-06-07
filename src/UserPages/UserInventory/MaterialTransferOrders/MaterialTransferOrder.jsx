import React, { useEffect, useState } from "react";
import { userId, role } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import MtoShowModal from "../../UserIndent(MR)/DetailShowingModal/MtoShowModal";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import Loader from "../../../CommonUtitlites/Loader/Loader";

export default function MaterialTransferOrder({projectId}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entry, setModalData] = useState({});
  const handleModalOpen = (data) => {
    setIsModalOpen(true);
    // console.log(data);
    setModalData(data);
  };
  const [mto, setMto] = useState([])
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function getMto() {
      setLoading(true);
      let result = api.post("/get-mtoEntryProjectwise", {projectId,userId, role });
      result = await errorHandler(result);
      // console.log('projectwise recieved', result);
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
