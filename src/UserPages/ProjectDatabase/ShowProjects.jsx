import React, { useEffect, useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import useGetBlock from "../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../CommonUtitlites/customHooks/useGetGP";
import useGetCompleteLocations from "../../CommonUtitlites/customHooks/useGetLocation";
import EditGp from "./EditGp";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import EditStore from "./EditStore";
export default function ShowProjects({ status }) {
  const [submit, setSubmit] = useState("")
  const projects = useGetCompleteLocations(submit);


  
  const [location, setLocation] = useState({ id: "", name: "" });
  const [block, setBlock] = useState({ id: "", name: "" });
  const [gp, setGp] = useState({ id: "", name: "" });

  let Blocks = useGetBlock(location?location.id:"", submit);
  let Gps = useGetGP(block?block.id:"", submit)
 

  
  
  const [modalOpen, setModalOpen] = useState(false)
  const [modalOpen2, setModalOpen2] = useState(false)

  
  const findStore = (locationId, gpId) => {
    const findingStore = projects.find((project) => project._id == locationId);
  
    if (findingStore) {
      const store = findingStore.stores.find((store) =>
        store.gps.some((gps) => gps._id == gpId)
      );
  
      if (store) {
        return store.name; // Return the store name containing gpId
      }
    }
  
    return null; // Return null if no store contains the gpId
  };

  return (
    <div className="container mt-3" style={{ overflow: "auto" }}>
       <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => {
            // setSubCategories([]); // Set subCategories state to an empty array
            setModalOpen(true);
          }}
          >
          Edit Gp
        </button>
       <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => {
            // setSubCategories([]); // Set subCategories state to an empty array
            setModalOpen2(true);
          }}
          >
          Edit Store
        </button>
    <table className="table">
      <thead >
        <tr>
          <th>Location Name</th>
          <th>Block Name</th>
          <th>GP Name</th>
          <th>Scheme Number</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Store Name</th>
        </tr>
      </thead>
      <tbody>
  {projects.map((entry) => (
    <React.Fragment key={entry._id}>
      {entry.blocks.length > 0 &&
        entry.blocks.map((block) =>
          block.gps.length > 0 &&
          block.gps.map((gp, i) => (
            <React.Fragment key={gp._id}>
              { // Check if latitude and longitude are present
                entry.stores.length > 0 ? (
                  entry.stores.map((store) => (
                    <tr key={gp._id}>
                      <td>{entry.name}</td>
                      <td>{block.name}</td>
                      <td>{gp.name}</td>
                      <td>{gp.schemeNo}</td>
                      <td>{gp.latitude}</td>
                      <td>{gp.longitude}</td>
                      <td>{findStore(entry._id, gp._id)}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={gp._id}>
                    <td>{entry.name}</td>
                    <td>{block.name}</td>
                    <td>{gp.name}</td>
                    <td>{gp.schemeNo}</td>
                    <td>{gp.latitude}</td>
                    <td>{gp.longitude}</td>
                    <td>-</td>
                  </tr>
                
              )}
            </React.Fragment>
          ))
        )}
    </React.Fragment>
  ))}
</tbody>

    </table>
    <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={"Edit Gp"}
        >
          <div className="container">
          <SearchInput
          id={"locationName"}
          title={"Location Name"}
          items={projects}
          placeholder={"Select Location Name"}
          ResultOnClick={(data) => setLocation(data)}
        />
        <SearchInput
          id={"blockName"}
          title={"Block"}
          items={Blocks}
          placeholder={"Select Block Name"}
          ResultOnClick={(data) => setBlock(data)}
        />
        <SearchInput
          id={"gpName"}
          title={"GP"}
          items={Gps}
          placeholder={"Select GP Name"}
          ResultOnClick={(data) => setGp(data)}
        />
        <EditGp gp={gp} setStatus={(status)=>setSubmit(status)}/>
          </div>
        </CustomModal>
    <CustomModal
        isOpen={modalOpen2}
        onClose={() => setModalOpen2(false)}
        title={"Edit Store"}
        >
          <div className="container">
          
     
        <EditStore setStatus={(status)=>setSubmit(status)}/>
          </div>
        </CustomModal>
    </div>
    
  );
}
// entry.blocks.map((block) =>
// block.gps.map((gp) =>
//   gp.stores.map((store) => (
//     <tr key={store._id}>
//       <td>{entry ? entry.name : "    -"}</td>
//       <td>{block ? block.name : "-"}</td>
//       <td>{gp ? gp.name : "-"}</td>
//       <td>{store ? store.name : "-"}</td>
//     </tr>
//   ))
// )
// )
