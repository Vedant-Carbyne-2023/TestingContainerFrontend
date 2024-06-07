import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllVendorsInDatabase from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import styles from "../Projects/AddMemberInProject/CheckboxDropdown.module.css";
import useGetCompleteLocations from "../../../CommonUtitlites/customHooks/useGetLocation";
import Swal from "sweetalert2";

export default function AddGpForm({ id, assigedGps, setStatus, project }) {
  const [gps, setGps] = useState([]);

  let databaseProjects = useGetCompleteLocations(setStatus);

  useEffect(() => {
    if (databaseProjects.length > 0)
      // console.log(databaseProjects, project.locationName);

    {
      const selectedProject = databaseProjects.find(
        (proj) => proj.name === project.locationName
      );

      if (selectedProject != undefined) {
        let gp = [];
        selectedProject.blocks.forEach((block) => {
          gp.push(...block.gps);
        });
        setGps(gp);
      }
    }
  }, [databaseProjects]);

  const [submit, setSubmit] = useState(false);
  
  const [selectedGps, setSelectedGps] = useState(assigedGps ? assigedGps : []);
  const handleGpSelection = (e,option) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedGps((prevSelectedGps) => [...prevSelectedGps, option]);
    } else {
      setSelectedGps((prevSelectedGps) =>
        prevSelectedGps.filter((gp) => gp._id !== option._id)
      );
    }
  };
  console.log(selectedGps)

  const handleAddVendors = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectId = formData.get("projectId");
    try {
      console.log("calling the api", selectedGps, projectId, userId, role);
      let result = await api.patch("/update-gps-projectWise", {
        gpName: selectedGps,
        projectId: projectId,
        userId,
        role,
      });

      result = await errorHandler(result);
      if (result && result.data) {
        Swal.fire
        ({
          title:result.data.message,
          icon:"success"
        })
      }
      setStatus(result.data.data.createdAt);
      setSubmit(!submit);
    } catch (error) {
      // Handle error and display error message to user
      alert("An error occurred while adding gps.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddVendors}>
        {" "}
        <div className="m-3 p-2">
          <div>
            {gps.map((gp) => (
              <label key={gp._id} className={styles.dropdownItem}>
                <div className="row">
                  <div className="col-md-5">{gp.name}</div>

                  <div className="col-md-2">
                    <input
                      type="checkbox"
                      id={gp._id}
                      value={gp.name}
                      checked={selectedGps.some((selectedGp) => selectedGp._id === gp._id)}
                      onChange={(e) => handleGpSelection(e,gp)}
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
