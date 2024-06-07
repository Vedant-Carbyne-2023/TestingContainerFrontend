import React, { useEffect, useState } from "react";
import { api } from "../functions/axiosDefault";
import { errorHandler } from "../functions/errorHandle";
import Pipe from "./Pipe/Pipe";
import moment from 'moment';
import Borewell from "./Borewell/Borewell";
import Oht from "./OHT/Oht";
import PumpHouse from "./PumpHouse/PumpHouse";
import Jmr from "./JMR/JMR";
import Hydrotest from "./Hydrotest/Hydrotest";
import Fhtc from "./FHTC/Fhtc";
import BoundaryWall from "./BoundaryWall/BoundaryWall";
import DateTimePicker from "react-datetime-picker";
import Clock from "../functions/Clock";
import ReactSelect from "react-select";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import SearchInputGpForDpr from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputGpForDpr";
export default function Dpr_Main_Form() {
  const [projects, setProjects] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  const [vendorData2, setVendorData2] = useState([]);
  const [formData, setFormData] = useState("");
  const [gpData, setGpData] = useState([]);

  const [vendorName, setVendorName] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format("DD-MM-YYYY"));
  const [allWorkData, setAllWorkData] = useState([]);
  const [allocatedTypesOfWork, setAllocatedTypesOfWork] = useState([]);



  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+G key combination
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault(); // Prevent the default behavior (e.g., opening the find bar in Chrome)
        document.getElementById('gpName').focus(); // Focus on the GP Name dropdown
      }
      else if (e.ctrlKey && e.key === 'x') {
        e.preventDefault(); // Prevent the default behavior (e.g., opening the find bar in Chrome)
        document.getElementById('typeOfWork').focus(); // Focus on the GP Name dropdown
      }
      else if (e.ctrlKey && e.key === 'p') {
        e.preventDefault(); // Prevent the default behavior (e.g., opening the find bar in Chrome)
        document.getElementById('projectName').focus(); // Focus on the GP Name dropdown
      }
    };

    // Add event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // Remove event listener when the component unmounts
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workDataResponse] = await Promise.all([
          api.post("/get-work-data"),
        ]);

        const [workDataResult] = await Promise.all([
          errorHandler(workDataResponse),
        ]);

        if (workDataResult?.data?.success) {
          console.log("WORK DATA", workDataResult)
          setAllWorkData(workDataResult.data.data || []);

          const allWorkData = workDataResult.data.data || [];


          const userId = localStorage.getItem('user_Id');
          const userWorkData = allWorkData.filter(work => work.userName.id === userId);
          const uniqueTypesOfWork = [...new Set(userWorkData.map(work => work.typeOfWork))];
          setAllocatedTypesOfWork(uniqueTypesOfWork);


          console.log("TYPE OF WORK", uniqueTypesOfWork)


        } else {
          console.error(
            "Error fetching all work data:",
            workDataResult?.data?.message
          );
        }
      } catch (error) {
        console.error("Error fetching all work data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(moment().format("DD-MM-YYYY"));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const [latestDpr, setLatestDpr] = useState("");

  const [borewell, setBorewell] = useState({
    loweringVendorName: "",
    compressorVendorName: "",
    gravellingVendorName: "",
    opUnitVendorName: "",
    drillingVendorName: "",
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     console.log(formData);
  //     let result = api.post(
  //       `/get${formData.typeOfWork.toLowerCase()}Dpr`,
  //       formData
  //     );
  //     result = await errorHandler(result);
  //     console.log(result);

  //     if (formData.typeOfWork === "Borewell") {
  //       setBorewell({
  //         loweringVendorName: result.data.data.pipeDpr.loweringVendorName,
  //         compressorVendorName: result.data.data.pipeDpr.compressorVendorName,
  //         gravellingVendorName: result.data.data.pipeDpr.gravellingVendorName,
  //         opUnitVendorName: result.data.data.pipeDpr.opUnitVendorName,
  //         drillingVendorName: result.data.data.pipeDpr.drillingVendorName,
  //       });

  //       setLatestDpr(result.data.data.latestDpr);
  //     } else if(formData.typeOfWork === "Pipe")
  //      {
  //       setVendorName(result.data.data.pipeDpr.vendorName);
  //       setScopeOfWork(result.data.data.pipeDpr.scopeOfWork);
  //       setLatestDpr(result.data.data.latestDpr);
  //     }
  //     else 
  //      {
  //       setVendorName(result.data.data.pipeDpr.vendorName);
  //       setScopeOfWork(result.data.data.pipeDpr.scopeOfWork);
  //       setLatestDpr(result.data.data.latestDpr);
  //     }
  //   };
  //   if (formData.typeOfWork) {
  //     getData();
  //   }
  // }, [formData.typeOfWork]);

  const handleChange = async (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    const selectedProject = projects.find((project) => project.name === value);

    if (fieldType === "projectName") {
      let result = api.post('/get-all-gps', { locationName: value })
      result = await errorHandler(result)
      setGpData(result.data.data || []);
      const vendorIds = selectedProject?.vendorAssignedTo || [];
      const filteredVendors = vendorData.filter((vendor) =>
        vendorIds.includes(vendor._id)
      );
      setVendorData2(filteredVendors);
    }
    setFormData(updatedFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsResponse, vendorsResponse] = await Promise.all([
          api.post("/get-dpr-projects"),
          api.post("/get-vendors"),
        ]);

        const [projectsResult, vendorsResult] = await Promise.all([
          errorHandler(projectsResponse),
          errorHandler(vendorsResponse),
        ]);

        if (projectsResult?.data?.success) {
          setProjects(projectsResult.data.data || []);
        } else {
          console.error(
            "Error fetching Projects:",
            projectsResult?.data?.message
          );
        }

        if (vendorsResult?.data?.success) {
          setVendorData(vendorsResult.data.data || []);
        } else {
          console.error(
            "Error fetching vendors:",
            vendorsResult?.data?.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  const handleTime = (timePeriod) => {
    const [time, period] = timePeriod.split(" ");
    const [hours, minutes] = time.split(":").map((part) => parseInt(part));

    let adjustedHours = hours % 12 + (period === "PM" ? 12 : 0);

    const defaultDate = new Date();
    defaultDate.setHours(adjustedHours);
    defaultDate.setMinutes(minutes);

    console.log(defaultDate);
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="projectName" title="Select Project From DropDown">Project Name</label>
          <select
            className="form-select"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={(e) => handleChange(e, "projectName")}
          >
            <option value="">Select Project Name</option>
            {projects.map((project) => (
              <option key={project._id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Shortcut: Ctrl+P</p>
        </div>

        <div className="col-md-4">
        <SearchInputGpForDpr
           title={"Select Gp Name"}
           placeholder={`Select Gp Name`}
           items={gpData}
           defaultValue={formData.gpName?formData.gpName:""}
           ResultOnClick={(data) => setFormData({ ...formData, gpName:data.name})}
          />
         
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Shortcut: Ctrl+G</p>
        </div>

        <div className="col-md-4">
          <label htmlFor="typeOfWork" title="Select Form Type From DropDown">
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
            {allocatedTypesOfWork.length>0 ? (
    allocatedTypesOfWork.flat().map((work) => (
      <option key={work} value={work}>
        {work}
      </option>
    ))
  ) : (
    [
      "Borewell",
      "Pipe",
      "FHTC",
      "Boundary Wall",
      "Pump House",
      "OHT",
      // "Hydrotest",
      // "JMR",
    ].map((work) => (
      <option key={work} value={work}>
        {work}
      </option>
    ))
  )}


          </select>
          <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>Shortcut: Ctrl+X</p>
        </div>

      </div>
      {/* <div style={{ position: "absolute", top: 130, right: 80 }}>
          <label>Today's Date:</label>
          <input
            className="form-control"
            type="text"
            value={currentDate}
            disabled
          />
        </div> */}



      {formData.typeOfWork && formData.typeOfWork === "Pipe" && (
        <Pipe
          vendorName={vendorName}
          latestDpr={latestDpr}
          scopeOfWork={scopeOfWork}
          projectName={formData.projectName}
          gpName={formData.gpName}
        />
      )}
      {formData.typeOfWork && formData.typeOfWork === "Borewell" && (
        <Borewell
          drillingVendorName={borewell.drillingVendorName}
          compressorVendorName={borewell.compressorVendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          opUnitVendorName={borewell.opUnitVendorName}
          loweringVendorName={borewell.loweringVendorName}
          latestDpr={latestDpr}
          gravellingVendorName={borewell.gravellingVendorName}
        />
      )}
      {formData.typeOfWork && formData.typeOfWork === "OHT" && (
        <Oht
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}
      {formData.typeOfWork && formData.typeOfWork === "Pump House" && (
        <PumpHouse
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}
      {formData.typeOfWork && formData.typeOfWork === "JMR" && (
        <Jmr
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}
      {formData.typeOfWork && formData.typeOfWork === "Hydrotest" && (
        <Hydrotest
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}

      {formData.typeOfWork && formData.typeOfWork === "FHTC" && (
        <Fhtc
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}

      {formData.typeOfWork && formData.typeOfWork === "Boundary Wall" && (
        <BoundaryWall
          scopeOfWork={scopeOfWork}
          vendorName={vendorName}
          projectName={formData.projectName}
          gpName={formData.gpName}
          latestDpr={latestDpr}
        />
      )}

    </div>
  );
}
