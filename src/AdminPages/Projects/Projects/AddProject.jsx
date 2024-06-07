import React, { useEffect, useState } from "react";
import useGetAllMembersInDatabase from "../../../CommonUtitlites/customHooks/useGetAllMembersInDatabase";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import CheckboxDropdown from "./AddMemberInProject/CheckboxDropdown";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetStores from "../../../CommonUtitlites/customHooks/useGetStore";
import Swal from "sweetalert2";
import CheckboxDropdownForGps from "./AddGpsInProject/CheckboxDropdownForGps";
export default function AddProject({ submitStatus }) {
  let members = useGetAllMembersInDatabase();
  const [submit, setSubmit] = useState(false);
  let databaseProjects = useGetCompleteLocations(submit);

  const [gps, setGps] = useState([]);
  const [selectedGp, setSelectedGp] = useState({});
  const [selectedBlock, setSelectedBlock] = useState({});
  const [selectedDBproject, setSelectedDBproject] = useState([]);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedGps, setSelectedGps] = useState([])

  let stores = useGetStores(selectedGp?selectedGp._id:"")



  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    console.log(selectedGps);
    const projectName = formData.get("projectName");
    const projectCode = formData.get("projectCode");
    const assignedTo = selectedMembers;
    // return; 
    
    try {
      // console.log(projectName,  assignedTo);
      if(!role || !projectName || !projectCode || !selectedDBproject){
        Swal.fire({
          text:"Any Required Field Is Missing",
          icon:'warning'
        })
      }
      let result = api.post("/create-project", {
        projectName,
        projectCode,
        blockName:selectedBlock.name,
        gpName:selectedGps,
        locationName:databaseProjects.find((project)=>project._id===selectedDBproject).name,
      
        assignedTo,
        role,
        userId,
        userName,
      });
      result = await errorHandler(result);
      
      if (result && result.data) {
        setSubmit(!submit);
        submitStatus(submit);
        Swal.fire({
          title:result.data.message,
        timer:3000,
        icon:'success'
        });
      }
    } catch (error) {
      console.log(error);
      if (error && error.response && error.response.data) {
        Swal.fire({
          title:error.response.data.message,
        timer:3000,
        icon:'error'
        });
      }
    }
  };

  const handleSelectProject = (data) => {
    console.log(data);
    const selectedProject = databaseProjects.find(
      (project) => project._id === data
    );
    let gp = [];
    selectedProject.blocks.forEach((block) => {
      gp.push(...block.gps);
    });

    console.log(gp, "sada");

    setSelectedDBproject(data);
    setGps(gp);
  };


  const handleCheckboxChange = (updatedOptions) => {
    setSelectedMembers(updatedOptions);
  };
  const handleCheckboxChangeForGps = (updatedOptions) => {
    setSelectedGps(updatedOptions);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Select Locations </label>
        <select
          id="dbprojectName"
          required
          className="form-control"
          value={selectedDBproject ? selectedDBproject._id : ""}
          onChange={(e) => handleSelectProject(e.target.value)}
        >
          <option>Please Select Location </option>
          {databaseProjects &&
            databaseProjects.map((project) => (
              <option value={project._id}>{project.name}</option>
            ))}
        </select>

        <label>Select GPs Alloted </label>
        <div>
          <CheckboxDropdownForGps options={gps} onChange={handleCheckboxChangeForGps} />
        </div>

        <label>Enter New Project Name</label>
        <input
          className="form-control"
          id="projectName"
          name="projectName"
          required
          placeholder="Enter Project Name"
        />
        <label>Enter New Project Code</label>
        <input
          className="form-control"
          id="projectCode"
          name="projectCode"
          required
          placeholder="Enter Project Code"
        />

        <label>Assigned To</label>
        <div>
          <CheckboxDropdown options={members} onChange={handleCheckboxChange} />
        </div>

        <button type="submit" className="btn btn-secondary mt-3 d-flex mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
}
