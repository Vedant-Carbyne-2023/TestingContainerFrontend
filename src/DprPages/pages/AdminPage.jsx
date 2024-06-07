import React, { useEffect, useState } from "react";
import { api } from "../functions/axiosDefault";
import { errorHandler } from "../functions/errorHandle";
import Swal from "sweetalert2";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import useGetUserProject from "../../CommonUtitlites/customHooks/useGetUserProject";
import "./AdminPage.css";
import SearchInputVendorForDpr from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendorForDpr";
import SearchInputGpForDpr from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputGpForDpr";

export default function AdminPage() {


  const [allVendors, setAllVendors] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [reason, setReason] = useState("");



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
  // useEffect(() => {
  //   const getVendors = async () => {
  //     let result = api.post("/get-vendors");
  //     result = await errorHandler(result);
  //     console.log(result);
  //     setAllVendors(result.data.data);
  //   };
  //   getVendors();
  // }, []);

  const [vendorData, setVendorData] = useState([]);
  const [vendorData2, setVendorData2] = useState([]);
  const [formData, setFormData] = useState("");
  const [gpData, setGpData] = useState([]);
  const [pipeDprData, setPipeDprData] = useState([{ diaOfPipe: 63, scopeOfWork: 0 },
  { diaOfPipe: 75, scopeOfWork: 0 },
  { diaOfPipe: 90, scopeOfWork: 0 },
  { diaOfPipe: 110, scopeOfWork: 0 },
  { diaOfPipe: 125, scopeOfWork: 0 },
  { diaOfPipe: 140, scopeOfWork: 0 },
  { diaOfPipe: 160, scopeOfWork: 0 },
  { diaOfPipe: 180, scopeOfWork: 0 },
  { diaOfPipe: 200, scopeOfWork: 0 }])

  const handleVendorSelect = (data) => {
    let vendor = allVendors.find((vendor) => vendor._id === data.id);
    setFormData({ ...formData, vendorName: vendor.vendorName });
    // console.log(vendor);
  };
  const handleCompressorVendorSelect = (data) => {
    let vendor = allVendors.find((vendor) => vendor._id === data.id);
    setFormData({ ...formData, compressorVendorName: vendor.vendorName });
    // console.log(vendor);
  };
  const handleDrillingVendorSelect = (data) => {
    let vendor = allVendors.find((vendor) => vendor._id === data.id);
    setFormData({ ...formData, drillingVendorName: vendor.vendorName });
    // console.log(vendor);
  };
  const handleOpUnitVendorSelect = (data) => {
    let vendor = allVendors.find((vendor) => vendor._id === data.id);
    setFormData({ ...formData, opUnitVendorName: vendor.vendorName });
    // console.log(vendor);
  };


  const handleSubmitDpr = async () => {
    // console.log(formData)
    // return
    console.log(`/create${formData.typeOfWork.toLowerCase()}Dpr`, formData);
    formData.reason = reason;

    if (formData.typeOfWork == 'Pipe') {
      formData.pipeDia = pipeDprData
    }
    if (formData.dprCreatedBy) {

      formData.dprCreatedBy = localStorage.getItem('user_Name')
    }

    let result = api.post(
      `/create${formData.typeOfWork.toLowerCase()}Dpr`,
      formData
    );
    result = await errorHandler(result);

    let historyResult = api.post('/store-history', { details: formData, reason });
    historyResult = await errorHandler(historyResult);
    console.log("History", historyResult);

    console.log(result);
    Swal.fire({
      title: result.data.message,
      timer: "2000",
      icon: "success",
    });
  };

  const handleShowHistory = async () => {
    try {
      if (formData.projectName && formData.gpName && formData.typeOfWork) {
        const historyResponse = await api.post('/get-history', {
          projectName: formData.projectName,
          gpName: formData.gpName,
          typeOfWork: formData.typeOfWork,
        });

        const historyResult = await errorHandler(historyResponse);
        console.log("History DATA", historyResult);

        setHistoryData(historyResult.data.data);

        setShowForm(false);
      } else {
        console.error("Missing data for history request");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  let projects = localStorage.getItem('role') == "SuperUser" ? useGetAllProjectsForAdmin() : useGetUserProject()
  useEffect(() => {
    const getData = async () => {
      console.log(formData);
      let result = api.post(
        `/get${formData.typeOfWork.toLowerCase()}DprAdmin`,
        formData
      );
      result = await errorHandler(result);
      console.log(result);

      if (formData.typeOfWork === "Borewell") {
        if (result.data.data != null) {
          const vendorNames = [
            "opUnitVendorName",
            "compressorVendorName",
            "gravellingVendorName",
            "loweringVendorName",
            "drillingVendorName",
            // Add more vendor names as needed
          ];

          // Assume result.data.data is an object with corresponding properties

          // Create a new object with updated vendor names in formData
          const updatedFormData = {};
          vendorNames.forEach((vendorName) => {
            updatedFormData[vendorName] = result.data.data ? result.data.data[vendorName] : "NA";
          });

          // Update the state with the new object
          setFormData({
            ...formData,
            ...updatedFormData,
            dprCreatedBy: result.data.data.dprCreatedBy,
          });
        }
        else {

          // Update the state with the new object
          setFormData({
            ...formData,
            ["opUnitVendorName"]: "NA",
            ["compressorVendorName"]: "NA",
            ["gravellingVendorName"]: "NA",
            ["loweringVendorName"]: "NA",
            ["drillingVendorName"]: "NA",
            ["dprCreatedBy"]: localStorage.getItem('user_Name'),
          });
        }
      }
      else if (formData.typeOfWork === "Pipe") {
        const updatedPipeDprData = pipeDprData.map(existingData => {
          const match = result.data.data.pipeDia.find(row => row.diaOfPipe === existingData.diaOfPipe);

          if (match) {
            return {
              ...existingData,
              scopeOfWork: match.scopeOfWork,
            };
          } else {
            return { ...existingData, scopeOfWork: 0 };
          }
        });

        // Now 'updatedPipeDprData' contains the modified data with updated 'scopeOfWork' values
        // You can set the updated array to state or perform further actions with it

        if (result.data.data == null) {
          setPipeDprData([{ diaOfPipe: 63, scopeOfWork: 0 },
          { diaOfPipe: 75, scopeOfWork: 0 },
          { diaOfPipe: 90, scopeOfWork: 0 },
          { diaOfPipe: 110, scopeOfWork: 0 },
          { diaOfPipe: 125, scopeOfWork: 0 },
          { diaOfPipe: 140, scopeOfWork: 0 },
          { diaOfPipe: 160, scopeOfWork: 0 },
          { diaOfPipe: 180, scopeOfWork: 0 },
          { diaOfPipe: 200, scopeOfWork: 0 }])
        }
        setPipeDprData(updatedPipeDprData)
        setFormData({
          ...formData,
          ["vendorName"]: result.data.data.vendorName,
          ["dprCreatedBy"]: result.data.data.dprCreatedBy,
        });
      }


      else {
        setFormData({
          ...formData,
          ["vendorName"]: result.data.data.vendorName,
          ["scopeOfWork"]: result.data.data.scopeOfWork,
          ["dprCreatedBy"]: result.data.data.dprCreatedBy,
        });
      }
    };
    if (formData.typeOfWork) {
      getData();
    }
  }, [formData.typeOfWork, formData.gpName]);

  const handleChange = async (e, fieldType, row) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    // const selectedProject = projects.find((project) => project.name === value);

    if (fieldType === "projectName") {
      let result = api.post('/get-all-gps', { locationName: value })
      result = await errorHandler(result)
      setGpData(result.data.data || [])
      // const vendorIds = selectedProject?.vendorAssignedTo || [];
      // const filteredVendors = vendorData.filter((vendor) =>
      //     vendorIds.includes(vendor._id)
      // );
      // setVendorData2(filteredVendors);
    }

    if (fieldType === "scopeOfWork") {
      if (row && value != "") {
        console.log(row, value)
        let newData = pipeDprData.map(data => {
          if (data.diaOfPipe == row.diaOfPipe) {
            return {
              ...data,
              scopeOfWork: parseInt(value)
            }
          }
          else {
            return data;
          }
        })
        console.log(newData)
        setPipeDprData(newData)
      }
    }
    setFormData(updatedFormData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call for vendors
        const vendorsResponse = await api.post("/get-vendors");
        const vendorsResult = await errorHandler(vendorsResponse);

        if (vendorsResult?.data?.data) {
          setAllVendors(vendorsResult.data.data || []);
        } else {
          console.error("Error fetching vendors:", vendorsResult?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
      }
    };

    fetchData();
  }, [formData.typeOfWork]);


  const formFields = [
    { label: "Scope Of Work", name: "scopeOfWork" },
    { label: "Creator Name", name: "dprCreatedBy" },
    // Add more fields as needed
  ];

  return (
    <div className="container-fluid px-5 mt-5">
      <center>
        <h4>Admin Panel</h4>
      </center>

      <div className="col-md-12 d-flex mt-5 mobile-view" style={{ justifyContent: "space-between" }}>
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
          <SearchInputGpForDpr
            title={"Select Gp Name"}
            placeholder={`Select Gp Name`}
            items={gpData}
            defaultValue={formData.gpName ? formData.gpName : ""}
            ResultOnClick={(data) => setFormData({ ...formData, gpName: data.name })}
          />
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


      <div className="col-md-12 mt-4 mb-4">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleShowHistory}
        >
          Show History
        </button>
      </div>
      {showForm ? (
        // Render the form if showForm state is true
        <>
          {formData.typeOfWork && formData.typeOfWork === "Pipe" && (
            <div className="col-md-6 mx-auto mt-5">
              <label className="form-label">Scope Of Work</label>
              <div className="row mb-3">
                {
                  pipeDprData &&
                  pipeDprData.map(row =>
                    < div className="d-flex" style={{ justifyContent: 'space-between' }}>
                      <input
                        type="text"
                        className="form-control"
                        name="pipeDia"
                        value={row.diaOfPipe}
                        disabled
                      // onChange={(e) => handleChange(e, "scopeOfWork")}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="scopeOfWork"
                        value={row.scopeOfWork}
                        onChange={(e) => handleChange(e, "scopeOfWork", row)}
                      />

                    </div>
                  )
                }

              </div>
              <div className="row">
                <SearchInputVendorForDpr
                  title={"Select Vendor Name"}
                  placeholder={`Select Vendor Name`}
                  items={allVendors}
                  defaultValue={formData.vendorName ? formData.vendorName : ""}
                  ResultOnClick={(data) => handleVendorSelect(data)}
                />
              </div>
              <div className="row">
                <label className="form-label">Creator Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="dprCreatedBy"
                  disabled
                  readOnly
                  value={formData.dprCreatedBy}
                  onChange={(e) => handleChange(e, "dprCreatedBy")}
                />
              </div>
            </div>
          )}
          {formData.typeOfWork && formData.typeOfWork === "Borewell" && (
            <div className="col-md-6 mx-auto mt-5">
              <div className="row mb-3">
                <SearchInputVendorForDpr
                  title={"Select Drilling Vendor Name"}
                  placeholder={`Select Drilling Vendor Name`}
                  items={allVendors}
                  defaultValue={formData.drillingVendorName ? formData.drillingVendorName : ""}
                  ResultOnClick={(data) => handleDrillingVendorSelect(data)}
                />
              </div>
              {/* <div className="row">
                <label className="form-label">Lowering Vendor Name</label>
                <input type='text' className='form-control' name='loweringVendorName' 
                  value={formData.loweringVendorName}
                  onChange={(e) => handleChange(e, "loweringVendorName")}
                />
            </div>
            <div className="row">
                <label className="form-label">Gravel Vendor Name</label>
                <input type='text' className='form-control' name='gravellingVendorName' 
                  value={formData.gravellingVendorName}
                  onChange={(e) => handleChange(e, "gravellingVendorName")}
                />
            </div> */}
              <div className="row">
                <SearchInputVendorForDpr
                  title={"Select Compressor Vendor Name"}
                  placeholder={`Select Compressor Vendor Name`}
                  items={allVendors}
                  defaultValue={formData.compressorVendorName ? formData.compressorVendorName : ""}
                  ResultOnClick={(data) => handleCompressorVendorSelect(data)}
                />
              </div>
              <div className="row">
                <SearchInputVendorForDpr
                  title={"Select Op Unit Vendor Name"}
                  placeholder={`Select Op Unit Vendor Name`}
                  items={allVendors}
                  defaultValue={formData.opUnitVendorName ? formData.opUnitVendorName : ""}
                  ResultOnClick={(data) => handleOpUnitVendorSelect(data)}
                />
              </div>
              <div className="row">
                <label className="form-label">Creator Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="dprCreatedBy"
                  readOnly
                  value={formData.dprCreatedBy}
                  onChange={(e) => handleChange(e, "dprCreatedBy")}
                />
              </div>
            </div>
          )}

          {(formData.typeOfWork === "OHT" ||
            formData.typeOfWork === "BoundaryWall" ||
            formData.typeOfWork === "JMR" ||
            formData.typeOfWork === "Hydrotest" ||
            formData.typeOfWork === "FHTC" ||
            formData.typeOfWork === "PumpHouse") && (
              <div className="col-md-6 mx-auto mt-5">
                {formFields.map((field, index) => (
                  <>
                    <div key={index} className="row mb-3">
                      <label className="form-label">{field.label}</label>
                      <input
                        type="text"
                        className="form-control"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={(e) => handleChange(e, field.name)}
                      />
                    </div>
                  </>
                ))}
                <div className="row">
                  <SearchInputVendorForDpr
                    title={"Select Vendor Name"}
                    placeholder={`Select Vendor Name`}
                    items={allVendors}
                    defaultValue={formData.vendorName ? formData.vendorName : ""}
                    ResultOnClick={(data) => handleVendorSelect(data)}
                  />
                </div>
              </div>
            )}
          <div className="d-flex flex-column align-items-center">
            <label className="form-label mb-2">Reason</label>
            <input
              type="text"
              className="form-control"
              // style={{ width: '500px' }}
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>



          <div
            className="col-md-12 mt-4 "
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSubmitDpr}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            {Array.isArray(historyData) && historyData.length > 0 ? (

              <div className="table-container">
                <table className="table" >
                  <thead>
                    <tr>
                      {historyData.some(historyItem => historyItem.details.typeOfWork === "Borewell") && (
                        <>
                          <th>Date</th>
                          <th>OpUnit VendorName</th>
                          <th>Compressor VendorName</th>
                          <th>Drilling VendorName</th>
                          <th>Created By</th>
                          <th>Reason</th>
                        </>
                      )}
                      {historyData.some(historyItem => historyItem.details.typeOfWork === "Pipe") && (
                        <>
                          <th>Date</th>
                          <th>Vendor Name</th>
                          <th>Pipe Diameter</th>
                          <th>Created By</th>
                          <th>Reason</th>
                        </>
                      )}
                      {historyData.some(historyItem => historyItem.details.typeOfWork === "OHT" ||
                        historyItem.details.typeOfWork === "FHTC" ||
                        historyItem.details.typeOfWork === "PumpHouse" ||
                        historyItem.details.typeOfWork === "BoundaryWall") && (
                          <>
                            <th>Date</th>
                            <th>Vendor Name</th>
                            <th>Scope Of Work</th>
                            <th>Created By</th>
                            <th>Reason</th>
                          </>
                        )}

                    </tr>
                  </thead>

                  <tbody>
                    {historyData.map((historyItem) => (
                      <tr key={historyItem._id}>
                        {historyItem.details.typeOfWork === "Borewell" && (
                          <>
                            <td>{new Date(historyItem.date).toLocaleDateString('en-GB')}</td>
                            <td>{historyItem.details.opUnitVendorName}</td>
                            <td>{historyItem.details.compressorVendorName}</td>
                            <td>{historyItem.details.drillingVendorName}</td>
                            <td>{historyItem.details.dprCreatedBy}</td>
                            <td>{historyItem.details.reason}</td>
                          </>
                        )}

                      </tr>
                    ))}
                    {historyData.map((historyItem) => (
                      <tr key={historyItem._id}>
                        {historyItem.details.typeOfWork === "Pipe" && (
                          <>
                            <td>{new Date(historyItem.date).toLocaleDateString('en-GB')}</td>

                            <td>{historyItem.details.vendorName}</td>
                            <td>
                              <ul>
                                {historyItem.details.pipeDia.map((pipe, index) => (
                                  <li className="mb-1" key={index}>{`Dia: ${pipe.diaOfPipe}, Scope: ${pipe.scopeOfWork}`}</li>
                                ))}
                              </ul>
                            </td>
                            <td>{historyItem.details.dprCreatedBy}</td>
                            <td>{historyItem.details.reason}</td>
                          </>
                        )}

                      </tr>
                    ))}
                    {historyData.map((historyItem) => (
                      <tr key={historyItem._id}>
                        {(historyItem.details.typeOfWork === "OHT" ||
                          historyItem.details.typeOfWork === "FHTC" ||
                          historyItem.details.typeOfWork === "PumpHouse" ||
                          historyItem.details.typeOfWork === "BoundaryWall") && (
                            <>
                              <td>{new Date(historyItem.date).toLocaleDateString('en-GB')}</td>
                              <td>{historyItem.details.vendorName}</td>
                              <td>{historyItem.details.scopeOfWork}</td>
                              <td>{historyItem.details.dprCreatedBy}</td>
                              <td>{historyItem.details.reason}</td>
                            </>
                          )}

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No history data available</p>
            )}

          </div>
          <div className="col-md-12 mt-3 mb-3">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setShowForm(true)}
            >
              Back to Form
            </button>
          </div>
        </>
      )}
    </div>
  );
}
