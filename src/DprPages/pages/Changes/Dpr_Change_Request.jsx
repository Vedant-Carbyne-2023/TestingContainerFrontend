import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import Swal from "sweetalert2";
import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";


export default function Dpr_Change_Request() {
    let projects = localStorage.getItem('role')=="SuperUser"?useGetAllProjectsForAdmin(): useGetUserProject()
    const [gpData, setGpData] = useState([]);
    const [fetchedData, setFetchedData] = useState(null); // New state for fetched data
    const [message, setMessage] = useState("");
const [createBorewell, setCreateBorewell] = useState(false)


    const [formData, setFormData] = useState({
        projectName: "",
        gpName: "",
        typeOfWork: "",
        selectedDate: null,
    });




    const handleChange = async(e, fieldType) => {
        const { name, value } = e.target;
        let updatedFormData = { ...formData, [name]: value };

        if (fieldType === "projectName") {
            let result =  api.post('/get-all-gps',{locationName:value})
            result = await errorHandler(result)
            setGpData(result.data.data || [])
            // const vendorIds = selectedProject?.vendorAssignedTo || [];
            // const filteredVendors = vendorData.filter((vendor) =>
            //     vendorIds.includes(vendor._id)
            // );
            // setVendorData2(filteredVendors);
          }
        console.log("here", updatedFormData);
        setFormData(updatedFormData);

    };

    const handleSubmit = async () => {
        console.log(formData, message , createBorewell)
        if (formData.projectName === "" || formData.gpName === "" || formData.typeOfWork === "" || message === "") {
            alert("Any Of Field Is Missing");
            return;
        }
        try {
            const submitResponse =  api.post("/handleChanges", {
                projectName: formData.projectName,
                gpName: formData.gpName,
                typeOfWork: formData.typeOfWork,
                message: message,
                createBorewell
            });
            const submitResult = await errorHandler(submitResponse);
            // submitResponse = await errorHandler(submitResponse)
            console.log("Changes PPP",formData.projectName);
            console.log("Changes GGGG",formData.gpName);
            console.log("Changes MMMMM",message);

            setCreateBorewell(false)
            setFormData({
                projectName:"",
                gpName:"",
                typeOfWork:""
            })
            setMessage("")
            if (submitResult?.data?.success) {
                // Handle success, e.g., show a success message
                Swal.fire({
                    timer:2000,
                    text:"Successfully Submitted",
                    icon:'success'
                })
                console.log("Changes submitted successfully");
            } else {
                console.error("Error submitting changes:", submitResult?.data?.message);
            }
        } catch (error) {
            console.error("Error submitting changes:", error);
            alert(error.message);
        }
    };




    return (
        <div className="container-fluid px-4 mt-5">
            <center>
                <h4>Changes Requested From The Site</h4>
            </center>

            <div className="col-md-12 d-flex mt-4" style={{ justifyContent: "space-around" }}>
                <div className="row">
                    <label htmlFor="projectName" className="form-label">
                        Project Name
                    </label>
                    <select
                        className="form-select"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={(e) => handleChange(e, "projectName")}
                    >
                        <option value="">Select Project Name</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
                    <label htmlFor="gpName">GP Name</label>
                    <select
                        className="form-select"
                        id="gpName"
                        name="gpName"
                        value={formData.gpName}
                        onChange={(e) => handleChange(e, "gpName")}
                    >
                        <option value="">Select GP Name</option>
                        {gpData.map((gp) => (
                            <option key={gp._id} value={gp.name}>
                                {gp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="row">
          <label htmlFor="typeOfWork" className="form-label">
            Type Of Work
          </label>
          <select
            className="form-select"
            id="typeOfWork"
            name="typeOfWork"
            value={formData.typeOfWork}
            onChange={(e) => handleChange(e, "typeOfWork")}
          >
            <option value="">Select Type Of Work</option>
            {[
              "Borewell",
              "Pipe",
              "FHTC",
              "BoundaryWall",
              "PumpHouse",
              "OHT",
              // "Hydrotest",
              // "JMR",
            ].map((work) => (
              <option key={work} value={work}>
                {work}
              </option>
            ))}
          </select>
        </div>


            </div>
            <div className="col-md-12 d-flex mt-4" style={{ justifyContent: "center" }}>
    <div className="row">
        <div className="text-center">
            <div className="mb-3" >
                <label htmlFor="message" className="form-label">
                    Message
                </label>
                {
                    formData.typeOfWork=="Borewell"
                    &&
                    <>
                    <p>Select Radio Button to Generate New Borewell</p>
                    <input
  type="radio"
  className="btn"
  checked={createBorewell}
  onClick={()=>setCreateBorewell(!createBorewell)}
  name="createBore"  // Replace "yourRadioGroupName" with a unique name for your radio group
/>
                    </>
                }
                <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={message}
                    placeholder="Type Your Message Here"
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ resize: "none", overflowY: "auto", wordWrap: "break-word" ,width: "300px", height: "200px" }}
                />
            </div>
            
            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    </div>
</div>





        </div>
    );
}
