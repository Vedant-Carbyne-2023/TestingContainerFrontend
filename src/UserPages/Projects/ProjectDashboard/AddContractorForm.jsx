import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllContractorsInDatabase from "../../../CommonUtitlites/customHooks/useGetAllContractors";
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import styles from '../Projects/AddMemberInProject/CheckboxDropdown.module.css'

export default function AddContractorForm({ id, assigedContractor, setStatus }) {
  let contractors = useGetAllContractorsInDatabase();
  console.log('all contractors', contractors);
 
 const [submit, setSubmit] = useState(false);

  const [selectedContractors, setSelectedContractors] = useState(
    assigedContractor ? assigedContractor : []
  );

  const handleContractorSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedContractors((prevSelectedContractors) => [
        ...prevSelectedContractors,
        value,
      ]);
    } else {
      setSelectedContractors((prevSelectedContractors) =>
        prevSelectedContractors.filter((contractorId) => contractorId !== value)
      );
    }
  };

  const handleAddContractors = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectId = formData.get("projectId");
  
    try {
        console.log('calling the api', selectedContractors, projectId, userId, role);
      let result = await api.patch("/add-contractors", {
        newContractors: selectedContractors,
        id: projectId,
        userId,
        role,
      });
  
      result = await errorHandler(result);
      if(result&&result.data){
        alert(result.data.message);
      }
      // Handle success and display message to user
    //   alert(response.data.message);
      setStatus(!submit);
      setSubmit(!submit);
    } catch (error) {
      // Handle error and display error message to user
      alert("An error occurred while adding contractors.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddContractors}>
        {" "}
        <div className="m-3 p-2">
          <div>
            {contractors.map((contractor) => (
              

<label key={contractor._id} className={styles.dropdownItem}>
<div className='row'>
                <div className='col-md-5'>
              {contractor.contractorName}
              </div>
              <div className='col-md-5'>
              {contractor.category}
              </div>
              <div className='col-md-2'>
              <input
               type="checkbox"
               id={contractor._id}
               value={contractor._id}
               checked={selectedContractors.includes(contractor._id)}
               onChange={handleContractorSelection}
               style={{ marginRight: "8px" }}
              />
              </div>
              </div>



            </label>
            ))}
          </div>
        </div>
        <input name="projectId" id="projectId" type="hidden" value={id} />
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ display: "flex", margin: "0 auto" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
